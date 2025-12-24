# waylight-atlantic
Waylight Homepage 

## Deployment

This website is automatically deployed to GitHub Pages at [www.waylight-atlantic.co.uk](https://www.waylight-atlantic.co.uk).
If you see `DNS_PROBE_FINISHED_NXDOMAIN` when visiting the custom domain, follow the DNS steps in [DEPLOYMENT.md](DEPLOYMENT.md#custom-domain-shows-dns-probe-finished-nxdomain).

### How to Push Code to the Live Website

The deployment process is fully automated using GitHub Actions. Here's how it works:

1. **Make your changes** to the HTML files, CSS, images, or other assets
2. **Commit your changes** using Git:
   - In VS Code: Use the Source Control panel (Ctrl+Shift+G / Cmd+Shift+G)
   - Or via terminal: `git add .` and `git commit -m "Your commit message"`
3. **Push to the main branch**:
   - In VS Code: Click the sync button or use the Source Control panel menu → Push
   - Or via terminal: `git push origin main`
4. **Automatic deployment**: GitHub Actions will automatically deploy your changes to the live website within a few minutes

You can monitor the deployment status:
- Go to the [Actions tab](https://github.com/Wally189/waylight-atlantic/actions) in the GitHub repository
- Look for the "Deploy to GitHub Pages" workflow
- Once the workflow completes successfully, your changes will be live

### Manual Deployment Trigger

If you need to re-deploy without making changes:
1. Go to the [Actions tab](https://github.com/Wally189/waylight-atlantic/actions)
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the main branch and click "Run workflow"

### Detailed Documentation

For comprehensive deployment documentation, troubleshooting, and best practices, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Public Folder URLs

- Files in the `public` folder are served at the site root. For example, the local file `public/about.html` becomes available at `/about.html` (not `/public/about.html`) on the live site.
- GitHub Pages does not provide directory listings; access files directly via their full paths (for example, `/assets/images/logo.png`).
- If someone visits a `/public/...` URL, the 404 page now redirects them to the correct root-relative path.

## Pull Request Checks

When you create a pull request, automated checks will run to validate your changes before merging to main:

- **Validate HTML files**: Ensures HTML files exist in the `public` directory
- **Check required files**: Verifies `public/index.html` and `CNAME` are present
- **Verify deployment directory**: Validates the structure of the `public` directory

These checks help maintain website quality and prevent deployment issues. You can view check results in the "Checks" tab of your pull request.

**Note:** If you encounter issues with stuck or pending checks, see [CHECKS_INTEGRATION_FIX.md](CHECKS_INTEGRATION_FIX.md) for troubleshooting guidance.

## VS Code Setup

This repository includes VS Code workspace configuration to help with automatic Git updates and development workflow.

### Automatic Git Features

The `.vscode/settings.json` file is configured to:
- **Auto-fetch**: Automatically fetch updates from the remote repository every 10 minutes
- **Fetch on pull**: Always fetch before pulling to get the latest remote changes
- **Smart commit**: Enable smart commit for easier Git operations

### How to Update the Repo with the Latest Changes

There are several ways to pull the latest changes from the remote repository in VS Code:

#### Method 1: Using the Source Control Panel (Easiest)

1. Click the **Source Control** icon in the left sidebar (or press `Ctrl+Shift+G` / `Cmd+Shift+G`)
2. Click the **three dots (...)** menu at the top of the Source Control panel
3. Select **Pull** from the dropdown menu
4. VS Code will download and merge the latest changes

#### Method 2: Using VS Code Tasks

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "Tasks: Run Task" and press Enter
3. Select one of these pre-configured tasks:
   - **Git: Pull Updates** - Pull the latest changes from the remote repository
   - **Git: Fetch All** - Fetch all branches and prune deleted remote branches
   - **Git: Sync (Pull & Push)** - Pull and push changes in one command
   - **Git: Show Status** - Display current Git status

#### Method 3: Using the Command Palette

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "Git: Pull" and press Enter
3. VS Code will pull the latest changes

#### Method 4: Using the Terminal

1. Open the integrated terminal in VS Code (`Ctrl+`` / `Cmd+``)
2. Run the command: `git pull`

#### Method 5: Using the Sync Button (Pull & Push)

1. Look at the bottom-left corner of VS Code
2. Click the **sync icon** (circular arrows) in the status bar
3. This will pull the latest changes AND push any local commits you have

### Troubleshooting

**Problem: "Your local changes would be overwritten by merge"**
- Solution: Either commit your changes first, or stash them with `git stash`, then pull

**Problem: "Merge conflicts"**
- Solution: VS Code will highlight conflicting files. Open them, resolve conflicts, then commit

**Problem: "Updates were rejected because the remote contains work that you do not have"**
- Solution: Pull first before pushing: use the Sync button or run `git pull` then `git push`

### Recommended Extensions

When you open this project in VS Code, you'll be prompted to install recommended extensions:
- GitHub Pull Requests and Issues
- GitLens
- Git Graph
- HTML CSS Support
- Auto Close Tag
- Auto Rename Tag
- Live Server

These extensions enhance the development experience with better Git integration and HTML editing tools.


## Social Media Sharing Image

The website uses Open Graph meta tags for social media sharing. The featured image for all pages is:

**File:** `assets/waylight-atlantic-seaside-poster.jpg`  
**Description:** Illustration of three people overlooking a seaside cliff  
**Dimensions:** 1200x800 pixels  
**Format:** JPEG  

This image file needs to be placed in the `assets/` directory for social media previews to work correctly.

### Testing Social Media Previews

- Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to verify the metadata
- Ensure the image displays correctly along with the title and description when sharing links
