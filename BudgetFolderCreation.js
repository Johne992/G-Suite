function createFoldersAndDocs() {
    let names = [
      "AfroSocialists and Socialists of Color Caucus",
      "Abolition Working Group",
      "Disability Working Group",
      "Green New Deal",
      "Immigrant Rights Working Group",
      "International Committee",
      "Medicare 4 All",
      "Multi-Racial Organizing Committee",
      "Mutual Aid Working Group",
      "National Electoral Committee",
      "National Labor Commission",
      "National Political Education Committee",
      "National Technology Committee",
      "Queer Socialist Working Group",
      "Religon and Socialism Working Group",
      "Growth & Development Committee",
      "Committee of Grievance Officers"
    ]; // All National Bodies
  
    let templateFolderId = '---'; // Replace with your template folder ID
    let parentFolderId = '---'; // Replace with your parent folder ID
    let templateFolder = DriveApp.getFolderById(templateFolderId);
    let parentFolder = DriveApp.getFolderById(parentFolderId);
  
    names.forEach(name => {
      if (name) {
        let newFolder = parentFolder.createFolder(name);
        let files = templateFolder.getFiles();
        while (files.hasNext()) {
          let file = files.next();
          let newFileName = file.getName().replace('National Committee', name);
          file.makeCopy(newFileName, newFolder);
        }
      }
    });
  }
  