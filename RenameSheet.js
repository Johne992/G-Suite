/**
 * Renames sheets in a specified Google Spreadsheet based on a provided mapping of old names to new names.
 *
 * @param {string} spreadsheetId The ID of the spreadsheet where sheets will be renamed.
 * @param {Object} nameMapping An object where keys are old sheet names and values are new sheet names.
 */
function renameSheetsInSpreadsheet(spreadsheetId, nameMapping) {
    // Open the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // Iterate over each entry in the name mapping object
    for (const [oldName, newName] of Object.entries(nameMapping)) {
      // Try to get the sheet with the old name
      const sheet = spreadsheet.getSheetByName(oldName);
      
      if (sheet) {
        // If the sheet exists, rename it to the new name
        sheet.setName(newName);
        console.log(`Renamed sheet '${oldName}' to '${newName}'.`);
      } else {
        // Log a message if the sheet with the old name does not exist
        console.log(`Sheet with name '${oldName}' does not exist. Skipping.`);
      }
    }
  }