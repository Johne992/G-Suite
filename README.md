# G-Suite Repository README

Welcome to the G-Suite repository! This repository contains a collection of Google Apps Script files designed to automate various tasks within Google Workspace (formerly G Suite). Below is an overview of the scripts included in this repository and their functionalities.

## Scripts Overview

### [BudgetFolderCreation.js](https://github.com/Johne992/G-Suite/blob/main/BudgetFolderCreation.js)
This script automates the creation of folders and documents for different committees and working groups. It uses a list of names to create folders in a specified parent folder and copies templates from a template folder into each newly created folder.

### [ResolutionRepoScript.js](https://github.com/Johne992/G-Suite/blob/main/ResolutionRepoScript.js)
This script processes resolutions by renaming documents based on their metadata (year, quarter, name, and number) and organizing them into a structured folder hierarchy within Google Drive. It also updates links in a master spreadsheet to point to the newly named or copied documents.

### [TransferFiles.js](https://github.com/Johne992/G-Suite/blob/main/TransferFiles.js)
This script facilitates the transfer of files from one folder to another within Google Drive and changes their ownership to a new owner. It's useful for managing file permissions and organization in collaborative environments.

### [UpdateChildSheets.js](https://github.com/Johne992/G-Suite/blob/main/UpdateChildSheets.js)
This script synchronizes specific ranges from a sheet in a parent spreadsheet to corresponding sheets in child spreadsheets. It ensures that data in distributed documents remains up-to-date with the master source. Additionally, it marks the last update time to track changes.

## Getting Started
To use these scripts, you'll need to have access to Google Apps Script, which is available within Google Workspace. Each script contains placeholders (e.g., folder IDs, spreadsheet IDs) that you'll need to replace with your specific values. 

### Setup
1. Open Google Apps Script and create a new project.
2. Copy and paste the code from the desired script into the script editor.
3. Replace the placeholder values with your specific information.
4. Save and run the script to automate your tasks.

## Contributions
Contributions to this repository are welcome! If you have improvements or new scripts that could benefit others in managing their Google Workspace environments, please feel free to fork the repository and submit a pull request.
