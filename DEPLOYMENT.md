# Deployment Guide

This repository deploys the Waylight Atlantic website to GitHub Pages from the repository root.

## Current deployment model

- **Source of truth:** repository root
- **Public demo pages:** `projects/`
- **Shared assets:** `assets/`
- **Deploy workflow:** `.github/workflows/deploy.yml`
- **Validation workflow:** `.github/workflows/pr-checks.yml`

## Before pushing

Run the local validation script:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\predeploy-checks.ps1 -Root .
```

The checks fail if:

- deployment is pointed at the wrong folder
- deprecated duplicate asset trees still exist
- required shared shell assets are missing
- live pages are missing the shared shell
- local links or asset references are broken

## Publish flow

1. Make changes in the root site files or `projects/`.
2. Run the local predeploy checks.
3. Commit and push to `main`.
4. GitHub Actions validates the repo and deploys the repository root to GitHub Pages.

## GitHub Pages settings

The repository should be configured in GitHub Pages as:

- **Source:** GitHub Actions
- **Custom domain:** `www.waylight-atlantic.co.uk`
- **HTTPS:** enabled

No branch-based `docs/` or `public/` deployment path is used.
