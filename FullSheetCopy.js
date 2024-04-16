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
  
  
