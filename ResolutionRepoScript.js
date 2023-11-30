function processResolutions() {
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let mainSheet = ss.getSheetByName("Documents (master list)");
  
    // Get the start and end rows
    let startRow = mainSheet.getRange("L3").getValue();
    let endRow = mainSheet.getRange("L5").getValue();
  
    // Loop through each row
    for (let i = startRow; i <= endRow; i++) {
      let docLink = mainSheet.getRange(i, 2).getValue();
  
      let year = mainSheet.getRange(i, 9).getValue();
      let quarter = mainSheet.getRange(i, 10).getValue();
      let resName = mainSheet.getRange(i, 8).getValue();
      let resNumber = mainSheet.getRange(i, 11).getValue();
      let currentName = mainSheet.getRange(i, 8).getValue(); // Name from column H
      let date = mainSheet.getRange(i, 5).getValue();
      let month = Utilities.formatDate(new Date(date), "GMT", "MMMM");
  
      let newName = resName;
  
      let fileIdMatch = docLink.match(/[-\w]{25,}/);
      if(!fileIdMatch) continue;
      let fileId = fileIdMatch[0];
  
      let file = DriveApp.getFileById(fileId);
  
      // If the file's name matches the current name in column H, then we assume it's been renamed previously
      if (file.getName() === currentName) {
        file.setName(newName); // Rename the existing file
      } else {
        // If not previously renamed, then make a copy with the new name
        let parentFolder = ensureFolderStructure(year, "Q" + quarter, month);
        let copiedFile = file.makeCopy(newName, parentFolder);
  
        // Replace the original link in column B with the link of the copied file
        mainSheet.getRange(i, 2).setValue(copiedFile.getUrl());
      }
    }
  }
  
  function ensureFolderStructure(year, quarter, month) {
    // Start from the provided directory instead of the root folder
    let rootDirectoryId = "---"; 
    let root = DriveApp.getFolderById(rootDirectoryId);
  
    // Check if year folder exists, if not create it
    let yearFolder;
    let folders = root.getFoldersByName(year);
    if (folders.hasNext()) {
      yearFolder = folders.next();
    } else {
      yearFolder = root.createFolder(year);
    }
  
    // Check if quarter folder exists within year folder, if not create it
    let quarterFolder;
    folders = yearFolder.getFoldersByName(quarter);
    if (folders.hasNext()) {
      quarterFolder = folders.next();
    } else {
      quarterFolder = yearFolder.createFolder(quarter);
    }
  
    // Check if month folder exists within quarter folder, if not create it
    let monthFolder;
    folders = quarterFolder.getFoldersByName(month);
    if (folders.hasNext()) {
      monthFolder = folders.next();
    } else {
      monthFolder = quarterFolder.createFolder(month);
    }
  
    return monthFolder;
  }
  
  // Create a custom menu to run the script
  function onOpen() {
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let user = Session.getActiveUser().getEmail(); // Get the current user's email
    let editors = ss.getEditors(); // Get the list of editors for the spreadsheet
    
    // Check if the current user is an editor
    let isEditor = editors.some(function(editor) {
      return editor.getEmail() === user;
    });
    
    if (isEditor) {
      // Create the custom menu only for editors
      let ui = SpreadsheetApp.getUi();
      ui.createMenu('Custom Menu')
          .addItem('Process Resolutions', 'processResolutions')
          .addToUi();
    }
  }