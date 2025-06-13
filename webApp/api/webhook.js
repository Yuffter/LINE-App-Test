// api/webhook.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const events = req.body.events;

    for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source.userId;            // ユーザーID
        const text = event.message.text;               // 送られてきたテキスト
        const replyToken = event.replyToken;

        // メッセージの内容を判定
        judgeContent(replyToken, text);
    }
    // テスト

    res.status(200).send('OK');
}

function judgeContent(replyToken, text) {
    // set distの場合
    if (text.startsWith('set dist')) {
        const distance = text.split(' ')[2];
        if (!isNaN(distance)) {
            return replyMessage(replyToken, `距離を${distance}メートルに設定しました。`);
        } else {
            return replyMessage(replyToken, '距離の値が不正です。数値を入力してください。');
        }
    }

    // set tempの場合
    if (text.startsWith('set temp')) {
        const temperature = text.split(' ')[2];
        if (!isNaN(temperature)) {
            return replyMessage(replyToken, `温度を${temperature}度に設定しました。`);
        } else {
            return replyMessage(replyToken, '温度の値が不正です。数値を入力してください。');
        }
    }
}

async function replyMessage(replyToken, message) {
    return await fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            replyToken,
            messages: [
                {
                    type: 'text',
                    text: message,
                },
            ],
        }),
    });
}
}