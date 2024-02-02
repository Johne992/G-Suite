/**
 * Synchronizes a specified range from a sheet in the parent spreadsheet to the same sheet in a child spreadsheet.
 *
 * @param {string} sheetName The name of the sheet/tab to synchronize.
 * @param {string} rangeToCopy The A1 notation of the range to copy (e.g., "A7:H179").
 * @param {string} childSpreadsheetId The ID of the child spreadsheet to synchronize the data to.
 */
function syncSpecificRangeFromParentToChild(sheetName, rangeToCopy, childSpreadsheetId) {
    const parentSpreadsheetId = 'PARENT_SPREADSHEET_ID'; // Replace with the ID of the parent spreadsheet

    // Open the parent spreadsheet and get the specified sheet
    const parentSpreadsheet = SpreadsheetApp.openById(parentSpreadsheetId);
    const parentSheet = parentSpreadsheet.getSheetByName(sheetName);

    // Retrieve values from the specified range in the parent sheet
    const dataToCopy = parentSheet.getRange(rangeToCopy).getValues();

    // Open the child spreadsheet and get the same sheet
    const childSpreadsheet = SpreadsheetApp.openById(childSpreadsheetId);
    const childSheet = childSpreadsheet.getSheetByName(sheetName);

    // Clear existing content in the target range of the child sheet
    // Ensure the range to clear matches the size of the data to copy
    childSheet.getRange(rangeToCopy).clearContent();

    // Write the new data into the child sheet
    childSheet.getRange(rangeToCopy).setValues(dataToCopy);
}


function syncMultipleSheets() {
    // Example of syncing multiple sheets with different ranges and child spreadsheet IDs
    syncSpecificRangeFromParentToChild('NC - NLC', 'A7:H179', 'CHILD_SPREADSHEET_ID_1');
    syncSpecificRangeFromParentToChild('Another Sheet', 'A1:H100', 'CHILD_SPREADSHEET_ID_2');
    // Add more calls as needed
}

syncMultipleSheets();