class LINESender {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /*
    LINE Messaging APIを使いてメッセージを送信するメソッド
    to - 送信先のユーザーID
    content - 送信するメッセージの内容
    */
    sendMassage(content) {
        const USER_LINE_ID = Config.USER_LINE_ID; /* 送り先のユーザID */
        // https://developers.line.biz/ja/reference/messaging-api/を参照してください
    }
}