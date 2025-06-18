// api/webhook.js

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const events = req.body.events;

        for (const event of events) {
            if (event.type === 'message' && event.message.type === 'text') {
                const userId = event.source.userId;
                const text = event.message.text;
                const replyToken = event.replyToken;

                // メッセージの内容を判定
                await judgeContent(replyToken, text);
            }
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function judgeContent(replyToken, text) {
    try {
        // set distの場合
        if (text.startsWith('set dist')) {
            const distance = text.split(' ')[2];
            if (!isNaN(distance)) {
                sendData('SetDistance', { distance: parseFloat(distance) });
                return await replyMessage(replyToken, `距離を${distance}メートルに設定しました。`);
            } else {
                return await replyMessage(replyToken, '距離の値が不正です。数値を入力してください。');
            }
        }

        // set tempの場合
        if (text.startsWith('set temp')) {
            const temperature = text.split(' ')[2];
            if (!isNaN(temperature)) {
                return await replyMessage(replyToken, `温度を${temperature}度に設定しました。`);
            } else {
                return await replyMessage(replyToken, '温度の値が不正です。数値を入力してください。');
            }
        }
    } catch (error) {
        console.error('judgeContent error:', error);
    }
}

async function replyMessage(replyToken, message) {
    try {
        const response = await fetch('https://api.line.me/v2/bot/message/reply', {
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

        if (!response.ok) {
            throw new Error(`LINE API error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('LINE API error:', error);
        throw error;
    }
}

function sendData(actionType, data) {
    const url = 'https://script.google.com/macros/s/AKfycbwm87Cgtw-vFYlUQzsKBvvzfrhmNvrsnOjPbqDX1sRq9PqKkBnRT1IWeHNtCZGffwCh/exec';

    const dataa = {
        "action": actionType,
        "distance" : data.distance
    };
    console.log(dataa);

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataa)
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
    console.log("sendData called");
}