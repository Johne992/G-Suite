  /**
   * Updates the "Admin" sheet with the "Last Updated" information for each sheet. 
   * Creates the "Admin" sheet if it does not exist.
   *
   * @param {string} spreadsheetId The ID of the spreadsheet where the last updated information will be written.
   * @param {string} sheetName The name of the sheet that was updated.
   */
  function updateLastUpdatedInAdminTab(spreadsheetId, sheetName) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let adminSheet = spreadsheet.getSheetByName('Admin');
  
    // Create the Admin sheet if it does not exist
    if (!adminSheet) {
      adminSheet = spreadsheet.insertSheet('Admin');
      // Initialize the header row if the Admin sheet is newly created
      adminSheet.appendRow(['Sheet Name', 'Last Updated']);
    }
  
    // Format the current date and time
    const now = new Date();
    const formattedDateTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
  
    // Check if the sheet name already has an entry in the Admin tab
    const lastRow = adminSheet.getLastRow();
    let foundRow = null;
    for (let i = 1; i <= lastRow; i++) {
      const sheetNameInAdmin = adminSheet.getRange(i, 1).getValue();
      if (sheetNameInAdmin === sheetName) {
        foundRow = i;
        break;
      }
    }
  
    // Update the existing row with the new "Last Updated" time or append a new row if not found
    if (foundRow) {
      adminSheet.getRange(foundRow, 2).setValue(formattedDateTime);
    } else {
      adminSheet.appendRow([sheetName, formattedDateTime]);
    }
  }
  