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
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.accessToken
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
    sendSignal(command) {  //(1,2,3,4) = on,off,up,down
        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            "Content-Type": "application/json"
        };

        const getOptions = {
            method: "get",
            headers: headers
        };

        // 家電情報を取得
        const getResponse = UrlFetchApp.fetch("https://api.nature.global/1/appliances", getOptions);
        const appliances = JSON.parse(getResponse.getContentText());

        // nickname が "エアコン" のものを探す
        let applianceId = "";
        for (let appliance of appliances) {
            if (appliance.nickname === "エアコン") {
                applianceId = appliance.id;
                break;
            }
        }
        if (applianceId == "")
            throw new Error("nickname が『エアコン』の家電が見つかりませんでした。");

        const url = 'https://api.nature.global/1/appliances/' +applianceId + '/aircon_settings';

        let payload = {}
        let nowTemp;
        switch (command) {
            case 1:
                payload = {button: 'power-on'};
                break;
            case 2:
                payload = {button: 'power-off'};
                break;
            case 3:
                nowTemp = SpreadSheetService.readData( Config.REMO_TEMPERATURE_CELL_ADDRESS() ); 
                payload = {"temperature": String( Number(nowTemp) + 1 )};
                break;
            case 4:
                nowTemp = SpreadSheetService.readData( Config.REMO_TEMPERATURE_CELL_ADDRESS() ); 
                payload = {"temperature": String( Number(nowTemp) - 1 )};
                break;
        }

        const postOptions = {
            method: "post",
            headers: headers,
            payload: payload,
            muteHttpExceptions: true
        };

        const postResponse = UrlFetchApp.fetch(url, postOptions);
        Logger.log(postResponse.getContentText());
    }
}