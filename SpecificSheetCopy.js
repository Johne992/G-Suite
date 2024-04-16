/**
 * Copies specific sheets from the parent spreadsheet to the child spreadsheet, including values and formatting.
 * Only sheets specified by name are copied.
 *
 * @param {string} parentSpreadsheetId The ID of the parent spreadsheet to copy data from.
 * @param {string} childSpreadsheetId The ID of the child spreadsheet to copy data to.
 * @param {Array<string>} sheetNamesToCopy An array of sheet names to copy from the parent to the child spreadsheet.
 */
function copySpecificSheetsFromParentToChild(parentSpreadsheetId, childSpreadsheetId, sheetNamesToCopy) {
    const parentSpreadsheet = SpreadsheetApp.openById(parentSpreadsheetId);
    const childSpreadsheet = SpreadsheetApp.openById(childSpreadsheetId);
  
    sheetNamesToCopy.forEach(function(sheetName) {
      const parentSheet = parentSpreadsheet.getSheetByName(sheetName);
      if (!parentSheet) {
        console.log(`Sheet '${sheetName}' does not exist in the parent spreadsheet. Skipping.`);
        return;
      }
  
      // Check if the child spreadsheet already has a sheet with the same name
      let childSheet = childSpreadsheet.getSheetByName(sheetName);
      if (childSheet) {
        // If so, clear the existing sheet
        childSheet.clear();
      } else {
        // Otherwise, create a new sheet with the name
        childSheet = childSpreadsheet.insertSheet(sheetName);
      }
  
      // Copy values from the parent sheet
      const rangeToCopy = parentSheet.getDataRange();
      const dataToCopy = rangeToCopy.getValues();
      childSheet.getRange(1, 1, dataToCopy.length, dataToCopy[0].length).setValues(dataToCopy);
  
      // Copy formatting from the parent sheet
      const formats = rangeToCopy.getTextStyles();
      const backgrounds = rangeToCopy.getBackgrounds();
      // Add more formatting attributes to copy as needed
  
      const targetRange = childSheet.getRange(1, 1, dataToCopy.length, dataToCopy[0].length);
      targetRange.setTextStyles(formats);
      targetRange.setBackgrounds(backgrounds);
      // Apply more formatting attributes to the target range as needed
  
      console.log(`Copied sheet '${sheetName}' from parent to child spreadsheet.`);
    });
  }
  