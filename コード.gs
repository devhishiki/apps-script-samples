function myFunction() {
  var blob = UrlFetchApp.fetch("https://upload.wikimedia.org/wikipedia/commons/2/2c/A_new_map_of_Great_Britain_according_to_the_newest_and_most_exact_observations_%288342715024%29.jpg")
  var s = blob.getBlob().getBytes().length
  DriveApp.addFile(DriveApp.createFile(blob))
}


function fetchFromFirebaseFunctions() {
  // DriveApp.getRootFolder() included to make sure the scope is added to the project so that our 
  // token can be passed to the firebase function (this is obsolete as we call DriveApp later in the code)
  DriveApp.getRootFolder(); 
  
  var url = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Clocktower_Panorama_20080622_20mb.jpg";
  var fnUrl = "https://us-central1-wosco-labo.cloudfunctions.net/answerTheFetch"; 
  
  var resp = JSON.parse(UrlFetchApp.fetch(fnUrl+"?url="+url+"&token="+ScriptApp.getOAuthToken()+"&filename=image.jpg").getContentText());
  var file_loaction = DriveApp.getFileById(resp.id).getUrl();
  
  Logger.log("The file "+resp.id+" can be viewed at "+file_loaction);
}
