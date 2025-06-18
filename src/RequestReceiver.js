/* 定期実行アプリやwebApp/api/webhookから情報が送られてきたときに呼ばれる関数 */
function doPost(e) {
    /*
    リクエストされるデータ形式は以下のどちらか
    {
        "action": "UpdateUserLocation",
        "latitude": 37.7749,
        "longitude": -122.4194,
    }
    {
        "action": "SetSettings",
        "data" : ""
    }
    */
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    /* actionの値によって呼び出す関数を切り替える */
    switch (action) {
      case 'UpdateUserLocation':
        updateUserLocation(data);
        console.log("updateUserLocation");
        return ContentService.createTextOutput('UserLocation updated');
      case 'UpdateHomeLocation':
        updateHomeLocation(data);
        console.log("updateHomeLocation");
        return ContentService.createTextOutput('HomeLocation updated');
      case 'SetDistance':
        setDistance(data);
        console.log("updateDistance");
        return ContentService.createTextOutput('Distance updated');
      case 'SetTemperature':
        setTemperature(data);
        console.log("updateTemperature");
        return ContentService.createTextOutput('Temperature updated');
      default:
        return ContentService.createTextOutput('Unknown action').setMimeType(ContentService.MimeType.TEXT);
    }
}

/*
ユーザの現在の座標をスプレッドシートに更新する関数
*/
function updateUserLocation(data) {
    const spreadsheetService = new SpreadSheetService(Config.SHEET_ID, Config.USER_SHEET_NAME);

    const user_latitude = data.user_latitude;
    const user_longitude = data.user_longitude;

    spreadsheetService.writeData(Config.USER_LATITUDE_CELL_ADDRESS,user_latitude);
    spreadsheetService.writeData(Config.USER_LONGITUDE_CELL_ADDRESS,user_longitude);
}

function updateHomeLocation(data) {
    const spreadsheetService = new SpreadSheetService(Config.SHEET_ID, Config.REMO_SHEET_NAME);

    const home_latitude = data.home_latitude;
    const home_longitude = data.home_longitude;

    spreadsheetService.writeData(Config.REMO_LATITUDE_CELL_ADDRESS,home_latitude);
    spreadsheetService.writeData(Config.REMO_LONGITUDE_CELL_ADDRESS,home_longitude);
}

/*
設定をスプレッドシートに保存する関数
*/
function setDistance(data) {
    const spreadsheetService = new SpreadSheetService(Config.SHEET_ID, Config.USER_SHEET_NAME);

    const distance= data.distance;

    spreadsheetService.writeData(Config.REMO_HUMIDITY_CELL_ADDRESS,distance);
}

function setTemperature(data) {
    const spreadsheetService = new SpreadSheetService(Config.SHEET_ID, Config.USER_SHEET_NAME);

    const temperature= data.temperature;

    spreadsheetService.writeData(Config.REMO_TEMPERATURE_CELL_ADDRESS,temperature);
}