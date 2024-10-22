function sendMailMerge() {
    // Variables for customization
    const sheetName = 'Sheet3';  // Specify the tab name (e.g., 'test')
    const draftSubjectText = "Important: Budget {{Name}} Adjustment for the Remainder of 2024";  // The subject of the draft email
    const requiredHeaders = ["Name", "Email Address", "cc", "Attachment"];  // Required column headers
    
    // Access the spreadsheet and the specified sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    // Check if the sheet exists
    if (!sheet) {
      Logger.log("Sheet not found!");
      return;
    }
    
    const data = sheet.getDataRange().getValues();  // Fetch the data from the specified sheet
    
    // Check if the first row contains the required columns
    const headers = data[0];  // The first row contains headers
    for (let i = 0; i < requiredHeaders.length; i++) {
      if (!headers.includes(requiredHeaders[i])) {
        Logger.log("Missing required column: " + requiredHeaders[i]);
        return;  // Exit the script if a required header is missing
      }
    }
  
    // Get the draft email by its subject (you can also use a draft ID)
    const drafts = GmailApp.getDrafts();
    let draft = null;
    
    // Find the draft email with the specified subject
    for (let i = 0; i < drafts.length; i++) {
      if (drafts[i].getMessage().getSubject() === draftSubjectText) {
        draft = drafts[i];
        break;
      }
    }
    
    if (!draft) {
      Logger.log("Draft not found with subject: " + draftSubjectText);
      return;
    }
    
    const draftBody = draft.getMessage().getBody();
    const draftSubject = draft.getMessage().getSubject();
    
    // Loop through the rows (starting at 1 to skip headers) and send emails
    for (let i = 1; i < data.length; i++) {
      const name = data[i][0];  // First column: Name
      const email = data[i][1];  // Second column: Email Address
      const cc = data[i][2];  // Third column: CC
      const attachmentLink = data[i][3];  // Fourth column: Attachment (link)
  
      // Replace placeholders in the draft body and subject with actual data
      let emailBody = draftBody.replace('{{Name}}', name)
                               .replace('{{Attachment}}', attachmentLink || '');
                               
      let personalizedSubject = draftSubject.replace('{{Name}}', name);
      
      // Prepare the email options
      let options = { cc: cc };
  
      // Send the email
      GmailApp.sendEmail(email, personalizedSubject, '', {
        htmlBody: emailBody,
        cc: cc
      });
      
      Logger.log("Email sent to " + email + " with subject: " + personalizedSubject);
    }
  }
  