# waylight-atlantic
Waylight Homepage 

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
