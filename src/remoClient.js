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
        const REMO_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';  // トークンは安全に管理するのが望ましい

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + REMO_ACCESS_TOKEN
        };

        const options = {
            method: "get",
            headers: headers
        };

        const response = UrlFetchApp.fetch("https://api.nature.global/1/devices", options);
        const deviceData = JSON.parse(response.getContentText());

        const temperature = deviceData[0].newest_events.te.val;
        const humidity = deviceData[0].newest_events.hu.val;

        let sensorData = new SensorData(temperature, humidity)
        return sensorData;
    }

    /*
    Nature Remo APIを使用してエアコンの操作を行うメソッド
    */
    sendSignal() {
        
    }
}