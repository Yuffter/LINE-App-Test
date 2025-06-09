/*
グローバル変数のクラス
アクセス方法: Config.<変数名>
*/
class Config {
    /*
    GASのプロパティサービスを使用して、スクリプトプロパティからremoのアクセストークンを取得する
    */
    get REMO_ACESS_TOKEN() {
        return PropertiesService.getScriptProperties().getProperty('REMO_ACCESS_TOKEN');
    }

    /*
    GASのプロパティサービスを使用して、スクリプトプロパティからLINEのアクセストークンを取得する
    */
    get LINE_ACCESS_TOKEN() {
        return PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN');
    }

    get SHEET_ID() {
        return PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    }

    get SHEET_NAME() {
        return PropertiesService.getScriptProperties().getProperty('SHEET_NAME');
    }
}