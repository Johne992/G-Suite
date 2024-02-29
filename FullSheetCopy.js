/**
 * Synchronizes all sheets from the parent spreadsheet to the same sheets in the child spreadsheet, including values and formatting,
 * with the option to exclude certain sheets by name.
 *
 * @param {string} parentSpreadsheetId The ID of the parent spreadsheet to synchronize data from.
 * @param {string} childSpreadsheetId The ID of the child spreadsheet to synchronize data to.
 * @param {Array<string>} excludeSheets An array of sheet names to exclude from the synchronization.
 */
function syncAllSheetsFromParentToChild(parentSpreadsheetId, childSpreadsheetId, excludeSheets) {
    const parentSpreadsheet = SpreadsheetApp.openById(parentSpreadsheetId);
    const parentSheets = parentSpreadsheet.getSheets();
    const childSpreadsheet = SpreadsheetApp.openById(childSpreadsheetId);
  
    parentSheets.forEach(function(parentSheet) {
      const sheetName = parentSheet.getName();
  
      // Check if the current sheet is in the list of sheets to exclude
      if (excludeSheets.includes(sheetName)) {
        console.log(`Skipping sheet: ${sheetName}`);
        return; // Skip this iteration, moving to the next sheet
      }
  
      let childSheet = childSpreadsheet.getSheetByName(sheetName);
      if (!childSheet) {
        childSheet = childSpreadsheet.insertSheet(sheetName);
        console.log(`Created new sheet in child spreadsheet: ${sheetName}`);
      } else {
        childSheet.clear(); // This clears values but not formatting
        console.log(`Cleared existing sheet in child spreadsheet: ${sheetName}`);
      }
  
      // Proceed with copying values and formatting as before
      const rangeToCopy = parentSheet.getDataRange();
      const dataToCopy = rangeToCopy.getValues();
      childSheet.getRange(1, 1, dataToCopy.length, dataToCopy[0].length).setValues(dataToCopy);
  
      // Copy formatting
      const formats = rangeToCopy.getTextStyles();
      const backgrounds = rangeToCopy.getBackgrounds();
      const fontColors = rangeToCopy.getFontColors();
      const fontFamilies = rangeToCopy.getFontFamilies();
      const fontLines = rangeToCopy.getFontLines();
      const fontWeights = rangeToCopy.getFontWeights();
      const horizontalAlignments = rangeToCopy.getHorizontalAlignments();
      const verticalAlignments = rangeToCopy.getVerticalAlignments();
      const numberFormats = rangeToCopy.getNumberFormats();
  
      const targetRange = childSheet.getRange(1, 1, dataToCopy.length, dataToCopy[0].length);
      targetRange.setTextStyles(formats);
      targetRange.setBackgrounds(backgrounds);
      targetRange.setFontColors(fontColors);
      targetRange.setFontFamilies(fontFamilies);
      targetRange.setFontLines(fontLines);
      targetRange.setFontWeights(fontWeights);
      targetRange.setHorizontalAlignments(horizontalAlignments);
      targetRange.setVerticalAlignments(verticalAlignments);
      targetRange.setNumberFormats(numberFormats);
  
      // Optionally, copy column widths and row heights
      for (let i = 1; i <= parentSheet.getMaxColumns(); i++) {
        const columnWidth = parentSheet.getColumnWidth(i);
        if (columnWidth) childSheet.setColumnWidth(i, columnWidth);
      }
      for (let j = 1; j <= parentSheet.getMaxRows(); j++) {
        const rowHeight = parentSheet.getRowHeight(j);
        if (rowHeight) childSheet.setRowHeight(j, rowHeight);
      }
      // Update "Last Updated" information on the child sheet
      updateLastUpdatedInAdminTab(childSpreadsheetId, sheetName);
    });
  }
  
  
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
  