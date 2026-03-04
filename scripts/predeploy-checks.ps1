param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

function Get-LineNumberFromIndex {
  param(
    [string]$Text,
    [int]$Index
  )

  if ($Index -le 0) {
    return 1
  }

  return ([regex]::Matches($Text.Substring(0, $Index), "`n").Count + 1)
}

function Add-Issue {
  param(
    [string]$Type,
    [string]$File,
    [int]$Line,
    [string]$Message
  )

  $script:issues += [pscustomobject]@{
    Type    = $Type
    File    = $File
    Line    = $Line
    Message = $Message
  }
}

$rootPath = (Resolve-Path -LiteralPath $Root).Path
$issues = @()

$htmlFiles = Get-ChildItem -Path $rootPath -File -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  $matches = [regex]::Matches($text, "(?i)(?:href|src)=['""]([^'""]+)['""]")

  foreach ($match in $matches) {
    $reference = $match.Groups[1].Value.Trim()

    if ($reference -match "^(?:[a-z]+:|//|#|mailto:|tel:|javascript:)" ) {
      continue
    }

    $cleanReference = $reference.Split("?")[0].Split("#")[0]
    if ([string]::IsNullOrWhiteSpace($cleanReference)) {
      continue
    }

    if ($cleanReference.StartsWith("/")) {
      $targetPath = Join-Path -Path $rootPath -ChildPath ($cleanReference.TrimStart("/", "\"))
    }
    else {
      $targetPath = Join-Path -Path $file.DirectoryName -ChildPath $cleanReference
    }

    if (-not (Test-Path -LiteralPath $targetPath)) {
      $line = Get-LineNumberFromIndex -Text $text -Index $match.Index
      Add-Issue -Type "BROKEN_REF" -File $file.FullName -Line $line -Message "Missing local target: $reference"
    }
  }
}

$textChecks = @(
  @{ Type = "MOJIBAKE"; Pattern = "&#226;\?\?"; Message = "Mojibake sequence found: &#226;??" },
  @{ Type = "MOJIBAKE"; Pattern = "�"; Message = "Unicode replacement character found." },
  @{ Type = "SPELLING"; Pattern = "\bhygeine\b"; Message = "Misspelling found: hygeine" },
  @{ Type = "SPELLING"; Pattern = "\bhygene\b"; Message = "Misspelling found: hygene" },
  @{ Type = "PLACEHOLDER"; Pattern = "Clean,\s*Crisp,\s*and\s*Clear"; Message = "Template placeholder content still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Structured Header"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Editorial Content Rhythm"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Unified Footer"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "This page now follows a shared editorial format used across the repo"; Message = "Template paragraph still present." }
)

$scanFiles = Get-ChildItem -Path $rootPath -File -Recurse | Where-Object { $_.Extension -in ".html", ".css", ".js", ".md" }

foreach ($file in $scanFiles) {
  foreach ($check in $textChecks) {
    $hits = Select-String -Path $file.FullName -Pattern $check.Pattern -AllMatches
    foreach ($hit in $hits) {
      Add-Issue -Type $check.Type -File $file.FullName -Line $hit.LineNumber -Message $check.Message
    }
  }
}

if ($issues.Count -eq 0) {
  Write-Host "Pre-deploy checks passed."
  exit 0
}

Write-Host "Pre-deploy checks failed with $($issues.Count) issue(s):"
$issues | Sort-Object Type, File, Line | ForEach-Object {
  Write-Host ("[{0}] {1}:{2} - {3}" -f $_.Type, $_.File, $_.Line, $_.Message)
}
exit 1
