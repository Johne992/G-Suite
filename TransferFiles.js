function moveFilesAndTransferOwnership() {
        let sourceFolderId = 'source-folder-id'; // Replace with your source folder ID
        let targetFolderId = 'target-folder-id'; // Replace with your target folder ID
        let newOwnerEmail = 'new-owner-email@example.com'; // Replace with the new owner's email
    
        let sourceFolder = DriveApp.getFolderById(sourceFolderId);
        let targetFolder = DriveApp.getFolderById(targetFolderId);
    
        let files = sourceFolder.getFiles();
        while (files.hasNext()) {
            let file = files.next();
            try {
                // Transfer ownership and move the file
                file.setOwner(newOwnerEmail);
                file.moveTo(targetFolder);
            } catch (e) {
                Logger.log('Error transferring ownership or moving file: ' + file.getName() + '. Error: ' + e.message);
                // Move the file even if ownership transfer fails
                file.moveTo(targetFolder);
            }
        }
    }
  