function doPost(e) {
    /*
    リクエストされるデータ形式は以下のどちらか
    {
        "action": "UpdateUserLocation",
        "latitude": 37.7749,
        "longitude": -122.4194,
    }
    {
        "action": SetSettings,
        "data" : ""
    }
    */
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
}

function updateUserLocation() {

}

function setSettings() {

}