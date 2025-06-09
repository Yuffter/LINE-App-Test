/*
GASのトリガーで定期的に呼ばれる関数
*/
function gasTrigger() {
  calculateDistance();

  CheckRoomTemperature();
}

function calculateDistance() {
  console.log("calculateDistance called");
}

function CheckRoomTemperature() {
  console.log("CheckRoomTemperature called");
}