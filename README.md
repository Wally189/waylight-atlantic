# Waylight Atlantic

Waylight Atlantic is a public portfolio and service concept site focused on practical websites, digital organisation, and responsible AI support for small organisations.

It is designed to demonstrate the ability to understand a messy organisational need, turn it into a clear digital structure, and explain the result in language ordinary decision-makers can use.

This repository is not mainly intended to show advanced software development. It is intended to show digital judgement: clear structure, maintainable content, sensible governance, plain-English documentation, and the ability to bridge people, process, technology, and AI.

## Portfolio position

- **Classification:** Portfolio
- **Primary audience:** small organisations, community bodies, charities, parish/school-style organisations, recruiters, collaborators, and hiring managers
- **Core message:** calm, practical digital support for organisations that need clarity rather than noise
- **Public status:** primary showcase site, subject to final polish and link checks

## What this repository demonstrates

- structured static website delivery
- plain-English service explanation
- practical information architecture
- reusable project and demo areas
- careful separation of live pages, projects, shared assets, and deployment notes
- use of GitHub as a transparent working environment
- ability to work with AI and web tools without losing human judgement

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
- `PROJECT-STATUS.md`: portfolio classification and clean-up standard

## Showcase standard

Before this site is treated as a primary external showcase, it should have:

- clear homepage positioning
- clear services or capability pages
- project examples that show practical organisational value
- consistent design and language
- checked links and deployment status
- no private or confidential client material
- no exaggerated AI or development claims

## Working principle

Waylight Atlantic should feel useful to a real person running a small organisation: steady, comprehensible, low-maintenance, and honest about what technology can and cannot do.