# waylight-atlantic

Waylight Atlantic is a static website deployed to GitHub Pages.

## Source of truth

- The repository root is the single source of truth for the live website.
- Root-level HTML files are the public pages.
- `projects/` contains public demo pages.
- Shared live assets are kept in:
  - `assets/css/editorial-shell.css`
  - `assets/js/editorial-shell.js`
  - `assets/images/`
  - `assets/img/`

There is no secondary `public/` site tree.

## Deployment

- GitHub Pages deploys from the repository root via `.github/workflows/deploy.yml`.
- Pull requests are validated by `.github/workflows/pr-checks.yml`.
- Run the local validation before publishing:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\predeploy-checks.ps1 -Root .
```

## Repo layout

- `index.html` and other root HTML files: live pages
- `projects/`: public demo pages
- `assets/`: canonical shared assets
- `scripts/predeploy-checks.ps1`: deploy validation
- `DEPLOYMENT.md`: deployment notes
