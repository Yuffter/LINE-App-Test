class RemoClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /*
    センサのデータを取得するメソッド
    戻り値: SensorData（例: { temperature: 22.5, humidity: 45 }）
    https://api.nature.global/1/devicesを使用
    */
    getSensorData() {
        const latitude = spreadSheetService.readData( REMO_LATITUDE_CELL_ADDRESS() )
        const longitude = spreadSheetService.readData( REMO_LONGITUDE_CELL_ADDRESS() )
        const temperature = spreadSheetService.readData( REMO_TEMPERATURE_CELL_ADDRESS() )
        const humidity = spreadSheetService.readData( REMO_HUMIDITY_CELL_ADDRESS() )

        return {latitude, longitude, temperature, humidity};
    }

    /*
    Nature Remo APIを使用してエアコンの操作を行うメソッド
    */
    sendSignal() {

    }
}