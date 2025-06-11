/*
GASのトリガーで定期的に呼ばれる関数
*/
function gasTrigger() {
  calculateDistance();

  CheckRoomTemperature();
  updateSensorData();
}

function calculateDistance() {
  console.log("calculateDistance called");
}

function CheckRoomTemperature() {
  console.log("CheckRoomTemperature called");
}

/*
センサーデータを取得し、スプレッドシートに保存する関数
*/
function updateSensorData() {
  console.log("updateSensorData called");
  let remoClient = new RemoClient(Config.REMO_ACESS_TOKEN);
  let spreadSheetService = new SpreadSheetService(Config.SHEET_ID, Config.REMO_SHEET_NAME);
  let remoData = remoClient.getSensorData();
  spreadSheetService.writeData(Config.REMO_TEMPERATURE_CELL_ADDRESS, [remoData.temperature]);
  spreadSheetService.writeData(Config.REMO_HUMIDITY_CELL_ADDRESS, [remoData.humidity]);
}