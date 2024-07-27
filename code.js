function GoogleFormToLine() {
  var sheet = SpreadsheetApp.getActiveSheet(); 
  var row = sheet.getLastRow(); 
  var column = sheet.getLastColumn();
  var range = sheet.getDataRange();
  var message = "";
  
  for(var i = 1; i <= column; i++) {
    var item = range.getCell(1, i).getValue(); 
    var value = range.getCell(row, i).getValue(); 
    if(item == "ประทับเวลา") {
      value = Utilities.formatDate(value, "GMT+7", "yyyy/MM/dd(E) HH:mm:ss");
    }
    message += "\n■" + item + "\n" + value; 
  }
  
  SendToDiscord(message);
}

function SendToDiscord(message) {
  var webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
  var payload = JSON.stringify({ content: message });
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": payload
  };
  
  var response = UrlFetchApp.fetch(webhookUrl, options);
  Logger.log(response.getContentText());
}
