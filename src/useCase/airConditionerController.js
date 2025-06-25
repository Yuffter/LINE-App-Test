class AirConditionerController {
  constructor(remoClient, spreadSheetService) {
    this.remoClient = remoClient;
    this.spreadSheetService = spreadSheetService;
  }

  /* エアコンの電源をオンにする */
  turnOn() {
    this.remoClient.sendSignal("ON");
  }

  /* エアコンの電源をオフにする */
  turnOff() {
    this.remoClient.sendSignal("OFF");
  }

  /* エアコンの温度を設定する */
  updateTemperature() {
    /* スプレッドシートからデータを読み込んで温度を設定する */
    const temperature = this.spreadSheetService.readData( USER_SETTING_TEMPERATURE_CELL_ADDRESS() );
    this.remoClient.sendSignal(temperature);
  }
}