# Business Manager - Bundle Update Guide

## Overview

You have multiple ways to keep your `dist/` folder (distribution bundle) updated with your latest changes.

---

## Option 1: Automatic Watch (Recommended) 🎯

### Method A: Double-click `watch-dist.bat`
**Easiest way** - No command line needed

1. Double-click `watch-dist.bat` in your project folder
2. A window opens and starts watching for changes
3. Every time you edit a file, it's automatically copied to `dist/`
4. Runs continuously until you close the window
5. Press `Ctrl+C` to stop

**What it watches:**
- `BusinessManager.html`
- `server.js`
- `package.json`

**Output Example:**
```
[12:34:56] ✓ Updated: BusinessManager.html
[12:35:01] ✓ Updated: server.js
```

### Method B: Use npm command
Open PowerShell/Command Prompt in your project folder:

```bash
npm run watch
```

Or alternatively:
```bash
npm run sync-dist
```

---

## Option 2: One-Time Sync (Manual) 📋

### Quick sync without watching
If you just want to copy files once without continuous watching:

**PowerShell:**
```powershell
.\sync-dist-now.ps1
```

**Or use npm:**
```bash
npm run sync-dist
```

This copies all files to `dist/` immediately and closes.

---

## Option 3: Manual Copy
Simply copy these files to `dist/` folder:
- `BusinessManager.html`
- `server.js`
- `package.json`

---

## Recommended Workflow

### When developing:
1. Open `watch-dist.bat` in one window
2. Edit your code in VS Code / editor
3. Changes auto-sync to `dist/` automatically
4. Test by running `dist/BusinessManager.bat`

### Before distributing:
1. Run watch to ensure dist is up to date
2. Test the `dist/BusinessManager.bat` with actual usage
3. Zip the entire `dist/` folder
4. Share with users

---

## Troubleshooting

### "PowerShell is not available"
- PowerShell comes with Windows by default
- Try running as Administrator
- Or run the `.ps1` files directly in PowerShell

### Files not syncing
1. Check if `watch-dist.bat` window is open
2. Make sure you're editing files in the project root
3. Stop and restart the watch script
4. Run `sync-dist-now.ps1` to force sync

### "ExecutionPolicy" error
Run this once in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## File Structure

```
your-project/
├── BusinessManager.html      ← Source file
├── server.js                 ← Source file
├── package.json              ← Source file
│
├── watch-dist.bat            ← Double-click to watch
├── watch-dist.ps1            ← PowerShell watch script
├── sync-dist-now.ps1         ← One-time sync script
│
└── dist/                      ← Distribution folder
    ├── BusinessManager.html   ← Auto-updated copy
    ├── server.js              ← Auto-updated copy
    ├── package.json           ← Auto-updated copy
    ├── BusinessManager.bat    ← User launcher
    └── README.txt             ← User instructions
```

---

## Quick Tips

✅ **Keep `watch-dist.bat` running while developing**

✅ **Test in `dist/` folder before sharing**

✅ **Close watch before editing package.json** (optional, but safer)

✅ **Zip `dist/` folder for sharing with users**

---

Need help? Check the README.txt in the `dist/` folder for user instructions.
