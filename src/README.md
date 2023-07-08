# Universal Paperclips (But it has savegames and you can play locally)
This is just a mirror of https://www.decisionproblem.com/paperclips, but no version of this game (not even on the payware phone version) allows you to export saves without writing code in the browser console everytime, this one does.

## Prerequisites
- A reasonably recent version of Windows
- PowerShell 7
- A reasonably recent version of Node.js
- Python 3

## First time steps
- Download this repository and open a Terminal window inside it
- Run `npm install nativefier -g`
- Double click on `BackupAndBuild.bat` and ignore security warnings

## Everytime steps
- Double click on `Universal Paperclips.bat` and ignore security warnings

## Notes
- This is extremely funky and not worth being distributed, yet here you are
- There are the `Save 1` and `Save 2` buttons, with the respective loaders, this is done by the creator so I just uncommented it. What's new is the possibility to run `BackupAndBuild.bat` again and get a new folder in the root directory that contains both saves and is portable to any other installation. This operation deletes the version you were using, so to restore the save you need to rename it `appData` and put it in `.\Universal Paperclips-win32-x64\resources\app`, overwriting when it asks.
- If someone wants to do a proper Electron app or, even better, a GitHub Pages mirror / browser extension that just adds a button to get your save as a file and load it, please do. It's most likely it already exists and I just failed to find it though.