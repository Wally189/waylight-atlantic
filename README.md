# waylight-atlantic
Waylight Homepage 

## VS Code Setup

This repository includes VS Code workspace configuration to help with automatic Git updates and development workflow.

### Automatic Git Features

The `.vscode/settings.json` file is configured to:
- **Auto-fetch**: Automatically fetch updates from the remote repository every 3 minutes
- **Auto-sync**: Automatically sync (pull and push) changes after commits
- **Fetch on pull**: Always fetch before pulling to get the latest remote changes

### Quick Git Operations

You can use VS Code tasks (Terminal → Run Task) to perform common Git operations:
- **Git: Pull Updates** - Pull the latest changes from the remote repository
- **Git: Fetch All** - Fetch all branches and prune deleted remote branches
- **Git: Sync (Pull & Push)** - Pull and push changes in one command
- **Git: Show Status** - Display current Git status

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
