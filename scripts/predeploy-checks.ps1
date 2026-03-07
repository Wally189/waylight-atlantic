param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

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

function Get-RelativePath {
  param(
    [string]$BasePath,
    [string]$TargetPath
  )

  $baseUri = New-Object System.Uri(($BasePath.TrimEnd("\") + "\"))
  $targetUri = New-Object System.Uri($TargetPath)
  return $baseUri.MakeRelativeUri($targetUri).ToString().Replace("/", "\")
}

function Assert-Exists {
  param(
    [string]$RelativePath,
    [string]$Type,
    [string]$Message
  )

  $target = Join-Path $rootPath $RelativePath
  if (-not (Test-Path -LiteralPath $target)) {
    Add-Issue -Type $Type -File $target -Line 1 -Message $Message
  }
}

function Assert-Missing {
  param(
    [string]$RelativePath,
    [string]$Type,
    [string]$Message
  )

  $target = Join-Path $rootPath $RelativePath
  if (Test-Path -LiteralPath $target) {
    Add-Issue -Type $Type -File $target -Line 1 -Message $Message
  }
}

$rootPath = (Resolve-Path -LiteralPath $Root).Path
$issues = @()

$redirectPages = @(
  "freebie-tips.html",
  "practical-organisation-tips.html"
)

$shellPages = @(
  "404.html",
  "about.html",
  "contact.html",
  "digital-hygiene.html",
  "gdpr.html",
  "index.html",
  "journal.html",
  "methods.html",
  "pricing.html",
  "privacy.html",
  "practical-tips.html",
  "sitemap.html",
  "templates.html",
  "terms.html",
  "tools.html",
  "workbench.html",
  "projects/business-demo.html",
  "projects/church-demo.html",
  "projects/hygiene-demo.html",
  "projects/school-demo.html"
)

$requiredRootFiles = @(
  ".nojekyll",
  "404.html",
  "CNAME",
  "contact.html",
  "index.html",
  "pricing.html",
  "robots.txt",
  "sitemap.xml",
  "assets/css/editorial-shell.css",
  "assets/js/editorial-shell.js",
  "assets/img/irish-cross.svg"
)

$forbiddenPaths = @(
  "public",
  "assets/style.css",
  "assets/style.min.css",
  "assets/script.js",
  "assets/script.min.js",
  "assets/redirect-from-public.js",
  "assets/css/style.css",
  "assets/css/style.min.css",
  "assets/css/site-theme.css",
  "assets/css/wl-core.css",
  "assets/js/script.js",
  "assets/js/script.min.js",
  "assets/js/wl-core.js",
  "assets/liturgy/liturgy-accent.css",
  "assets/liturgy/liturgy-accent.js"
)

$textChecks = @(
  @{ Type = "MOJIBAKE"; Pattern = "�"; Message = "Unicode replacement character found." },
  @{ Type = "SPELLING"; Pattern = "\bhygeine\b"; Message = "Misspelling found: hygeine" },
  @{ Type = "SPELLING"; Pattern = "\bhygene\b"; Message = "Misspelling found: hygene" },
  @{ Type = "PLACEHOLDER"; Pattern = "Clean,\s*Crisp,\s*and\s*Clear"; Message = "Template placeholder content still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Structured Header"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Editorial Content Rhythm"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "Unified Footer"; Message = "Template summary item still present." },
  @{ Type = "PLACEHOLDER"; Pattern = "This page now follows a shared editorial format used across the repo"; Message = "Template paragraph still present." }
)

foreach ($relativePath in $requiredRootFiles) {
  Assert-Exists -RelativePath $relativePath -Type "MISSING_REQUIRED" -Message "Required source-of-truth file is missing."
}

foreach ($relativePath in $forbiddenPaths) {
  Assert-Missing -RelativePath $relativePath -Type "DUPLICATE_ASSET" -Message "Deprecated duplicate path still exists and creates source-of-truth ambiguity."
}

$deployWorkflowPath = Join-Path $rootPath ".github/workflows/deploy.yml"
$prWorkflowPath = Join-Path $rootPath ".github/workflows/pr-checks.yml"

Assert-Exists -RelativePath ".github/workflows/deploy.yml" -Type "MISSING_WORKFLOW" -Message "Deploy workflow is missing."
Assert-Exists -RelativePath ".github/workflows/pr-checks.yml" -Type "MISSING_WORKFLOW" -Message "PR validation workflow is missing."

if (Test-Path -LiteralPath $deployWorkflowPath) {
  $deployWorkflow = Get-Content -LiteralPath $deployWorkflowPath -Raw
  if ($deployWorkflow -notmatch "path:\s*\." ) {
    Add-Issue -Type "DEPLOY_MISMATCH" -File $deployWorkflowPath -Line 1 -Message "Deploy workflow must upload the repository root as the source-of-truth artifact."
  }
  if ($deployWorkflow -match "public") {
    Add-Issue -Type "DEPLOY_MISMATCH" -File $deployWorkflowPath -Line 1 -Message "Deploy workflow still references the retired public deploy path."
  }
}

if (Test-Path -LiteralPath $prWorkflowPath) {
  $prWorkflow = Get-Content -LiteralPath $prWorkflowPath -Raw
  if ($prWorkflow -notmatch "predeploy-checks\.ps1") {
    Add-Issue -Type "CHECK_MISMATCH" -File $prWorkflowPath -Line 1 -Message "PR checks must run the shared predeploy validation script."
  }
}

$allHtmlFiles = Get-ChildItem -Path $rootPath -File -Filter "*.html" -Recurse

foreach ($file in $allHtmlFiles) {
  $relativePath = (Get-RelativePath -BasePath $rootPath -TargetPath $file.FullName).Replace("\", "/")
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

  foreach ($check in $textChecks) {
    $hits = Select-String -Path $file.FullName -Pattern $check.Pattern -AllMatches
    foreach ($hit in $hits) {
      Add-Issue -Type $check.Type -File $file.FullName -Line $hit.LineNumber -Message $check.Message
    }
  }

  if ($redirectPages -contains $relativePath) {
    if ($text -notmatch "<meta http-equiv='refresh'") {
      Add-Issue -Type "REDIRECT_INVALID" -File $file.FullName -Line 1 -Message "Redirect page is missing the expected meta refresh."
    }
    continue
  }

  if ($shellPages -contains $relativePath) {
    $cssPattern = if ($relativePath.StartsWith("projects/")) { "../assets/css/editorial-shell.css" } else { "assets/css/editorial-shell.css" }
    $jsPattern = if ($relativePath.StartsWith("projects/")) { "../assets/js/editorial-shell.js" } else { "assets/js/editorial-shell.js" }
    $homePattern = if ($relativePath.StartsWith("projects/")) { "<p class='wordmark'><a href='../index.html'>" } else { "<p class='wordmark'><a href='index.html'>" }

    if ($text -notmatch [regex]::Escape($cssPattern)) {
      Add-Issue -Type "SHELL_MISSING" -File $file.FullName -Line 1 -Message "Shared editorial stylesheet reference is missing."
    }
    if ($text -notmatch [regex]::Escape($jsPattern)) {
      Add-Issue -Type "SHELL_MISSING" -File $file.FullName -Line 1 -Message "Shared editorial script reference is missing."
    }
    if ($text -notmatch [regex]::Escape($homePattern)) {
      Add-Issue -Type "SHELL_MISSING" -File $file.FullName -Line 1 -Message "Shared wordmark markup is missing or incorrect."
    }
    if ($text -notmatch "<h1 class='page-title'>.+</h1>") {
      Add-Issue -Type "SEMANTICS" -File $file.FullName -Line 1 -Message "Page is missing a non-empty main H1 page title."
    }
    if ($text -notmatch "data-datetime") {
      Add-Issue -Type "SHELL_MISSING" -File $file.FullName -Line 1 -Message "Shared footer datetime node is missing."
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
