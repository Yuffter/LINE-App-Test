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
    if (action == "UpdateUserLocation") {
        updateUserLocation(data);
    }
    else if (action == "SetSettings") {
        setSettings(data);
    } else {
        throw new Error("Unknown action: " + action);
    }
}

/*
ユーザの現在の座標をスプレッドシートに更新する関数
*/
function updateUserLocation(data) {
    
}

/*
設定をスプレッドシートに保存する関数
*/
function setSettings(data) {
    
}