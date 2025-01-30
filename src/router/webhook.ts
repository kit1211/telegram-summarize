import express                           from 'express'
import TelegramBot                       from 'node-telegram-bot-api';
import { getAllowedGroups, saveMessage } from '../utils/helper';


const url   : string = process.env.YOUR_TELEGRAM_BOT_URL || "";
const token : string = process.env.YOUR_TELEGRAM_BOT_TOKEN || "";

const router = express.Router();



const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);



router.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


bot.on('message', async (msg) => {
    // const date = new Date(msg.date * 1000);
    // const formattedDate = date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
    // console.log(formattedDate);
    const allowedGroups = await getAllowedGroups(); // ดึงข้อมูลจาก DB
    if (allowedGroups.has(BigInt(msg.chat.id))) {
        await saveMessage(msg);
        // bot.sendMessage(msg.chat.id, 'Hi', {
        //     reply_to_message_id: msg.message_id
        // });
    }
});


export default router;