# Deployment Guide

This guide explains how to deploy the Waylight Atlantic website to the live environment.

## Prerequisites

Before you can deploy, ensure you have:
- Write access to the GitHub repository
- Git installed on your local machine
- A code editor (VS Code recommended)

## Deployment Overview

The website is hosted on **GitHub Pages** and uses **GitHub Actions** for automatic deployment. The live site is available at [www.waylight-atlantic.co.uk](https://www.waylight-atlantic.co.uk).

## How Deployment Works

```
Local Changes → Git Commit → Push to main branch → GitHub Actions → Live Website
```

1. You make changes to HTML, CSS, images, or other files locally
2. You commit and push those changes to the `main` branch on GitHub
3. GitHub Actions automatically runs a deployment workflow
4. The website is deployed to GitHub Pages
5. Changes appear on the live website within 2-5 minutes

## Step-by-Step Deployment Instructions

### Using VS Code (Recommended)

1. **Make your changes**
   - Edit any HTML files, CSS, images, or other assets
   - Save your files (auto-save is enabled by default)

2. **View your changes**
   - Open the Source Control panel (Ctrl+Shift+G or Cmd+Shift+G)
   - You'll see all modified files listed

3. **Commit your changes**
   - Enter a commit message in the text box (e.g., "Update homepage content")
   - Click the ✓ checkmark button to commit
   - Or press Ctrl+Enter / Cmd+Enter

4. **Push to GitHub**
   - Click the "Sync Changes" button that appears after committing
   - Or click the sync icon (circular arrows) in the status bar
   - Or use the Source Control menu (...) → Push

5. **Monitor deployment**
   - Go to: https://github.com/Wally189/waylight-atlantic/actions
   - Watch the "Deploy to GitHub Pages" workflow run
   - Green checkmark = successful deployment
   - Red X = deployment failed (check the logs)

### Using Command Line

1. **Make your changes**
   - Edit files using your preferred editor

2. **Check status**
   ```bash
   git status
   ```

3. **Stage your changes**
   ```bash
   git add .
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Your descriptive commit message"
   ```

5. **Push to GitHub**
   ```bash
   git push origin main
   ```

6. **Monitor deployment**
   - Visit: https://github.com/Wally189/waylight-atlantic/actions
   - Watch the workflow run to completion

## Manual Deployment Trigger

If you need to redeploy the site without making any code changes:

1. Go to the [Actions tab](https://github.com/Wally189/waylight-atlantic/actions)
2. Click on "Deploy to GitHub Pages" in the left sidebar
3. Click the "Run workflow" button (top right)
4. Select "main" branch from the dropdown
5. Click "Run workflow"

The deployment will start immediately.

## Deployment Time

- **Normal deployments**: 2-5 minutes after pushing to main
- **First-time setup**: May take up to 10 minutes
- **DNS propagation** (for custom domain): Up to 24 hours (already configured)

## Checking Deployment Status

### Method 1: GitHub Actions Tab
1. Go to: https://github.com/Wally189/waylight-atlantic/actions
2. Look for the most recent workflow run
3. Click on it to see detailed logs
4. Green checkmark = success, Red X = failure

### Method 2: Commit History
1. Go to: https://github.com/Wally189/waylight-atlantic/commits/main
2. Look for green checkmark (✓) or red X (✗) next to commits
3. Click the icon to see deployment details

### Method 3: Live Website
1. Wait 2-5 minutes after pushing
2. Visit https://www.waylight-atlantic.co.uk
3. Hard refresh to clear cache (Ctrl+Shift+R / Cmd+Shift+R)
4. Verify your changes appear

## Troubleshooting

### Changes Not Appearing on Live Site

1. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open the site in incognito/private mode

2. **Check workflow status**
   - Visit the Actions tab
   - Ensure the workflow completed successfully
   - If it failed, click on it to view error logs

3. **Verify you pushed to main**
   ```bash
   git branch
   ```
   Should show `* main`. If not, checkout main and push again.

### Custom domain shows DNS PROBE FINISHED NXDOMAIN

This error means DNS cannot find `www.waylight-atlantic.co.uk` before the request ever reaches GitHub Pages. To fix:
1. Confirm the domain is active with your registrar.
2. In DNS settings, add a **CNAME** record:  
   - **Name/Host**: `www`  
   - **Value/Target**: `wally189.github.io`
3. (Optional for apex) Add A records for `waylight-atlantic.co.uk` pointing to GitHub Pages IPs `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. Keep the `public/CNAME` file set to `www.waylight-atlantic.co.uk`.
5. Wait for DNS propagation (can take up to 24 hours), then retry the site.

### Deployment Workflow Failed

1. **View the error logs**
   - Go to Actions tab
   - Click on the failed workflow
   - Click on the "deploy" job
   - Read the error messages

2. **Common issues**
   - Invalid HTML syntax: Validate your HTML files
   - Large file sizes: GitHub Pages has size limits
   - Permission issues: Ensure GitHub Pages is enabled

3. **Re-run the workflow**
   - Click "Re-run jobs" in the failed workflow
   - Select "Re-run failed jobs"

### Push Rejected

If your push is rejected with "Updates were rejected":

1. **Pull latest changes first**
   ```bash
   git pull origin main
   ```

2. **Resolve any conflicts**
   - VS Code will highlight conflicting files
   - Edit files to resolve conflicts
   - Commit the resolved files

3. **Push again**
   ```bash
   git push origin main
   ```

## GitHub Pages Configuration

The repository is configured to use GitHub Pages with:
- **Source**: GitHub Actions (not branch-based)
- **Custom domain**: www.waylight-atlantic.co.uk
- **HTTPS**: Enabled (enforced)
- **CNAME file**: Configured in repository root

### Verifying GitHub Pages Settings

1. Go to repository Settings
2. Click "Pages" in the left sidebar
3. Verify:
   - Source: "GitHub Actions"
   - Custom domain: "www.waylight-atlantic.co.uk"
   - Enforce HTTPS: ✓ checked

## Best Practices

1. **Test locally first**
   - Use Live Server extension in VS Code
   - Preview changes before committing

2. **Write descriptive commit messages**
   - Good: "Update pricing page with new plans"
   - Bad: "changes" or "update"

3. **Make small, frequent commits**
   - Don't bundle unrelated changes
   - Makes it easier to revert if needed

4. **Review changes before pushing**
   - Check the Source Control diff view
   - Ensure no unwanted files are included

5. **Monitor the first deployment**
   - Watch the Actions tab for the first few deployments
   - Familiarize yourself with the workflow output

## Emergency Rollback

If you need to revert to a previous version:

1. **Find the commit to revert to**
   ```bash
   git log --oneline
   ```

2. **Revert to that commit**
   ```bash
   git revert <commit-hash>
   ```

3. **Push the revert**
   ```bash
   git push origin main
   ```

4. **Or reset to previous commit** (use with caution)
   ```bash
   git reset --hard <commit-hash>
   git push origin main --force
   ```
   ⚠️ **Warning**: Force push should only be used in emergencies

## Support

If you encounter issues not covered in this guide:
1. Check the GitHub Actions logs for detailed error messages
2. Verify GitHub Pages is enabled in repository settings
3. Check the repository's Issues tab for similar problems
4. Contact the repository maintainer

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
