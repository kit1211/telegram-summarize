import express          from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();


router.get('/chat/:chatId', async (req, res) => {
    const chatId = BigInt(req.params.chatId);
    // ดึงข้อความทั้งหมดจากฐานข้อมูล พร้อมข้อมูล reply
    const messages = await prisma.message.findMany({
        where   : { chatId },
        include : {
            user    : true,
            replyTo : { include: { user: true } } // รวมข้อมูลของข้อความที่ถูก reply
        },
        orderBy: { timestamp: 'asc' } // เรียงตามเวลา
    });

    // แปลงโครงสร้างให้อยู่ในรูปแบบเธรด
    const structuredMessages = messages.map(msg => ({
        messageId: Number(msg.id), // ✅ แปลงเป็น string
        text     : msg.text,
        timestamp: msg.timestamp.toISOString(), // ✅ ใช้ .toISOString() ให้ timestamp เป็น String
        user: {
            id      : Number(msg.user.id), // ✅ แปลงเป็น string
            name    : msg.user.firstName + (msg.user.lastName ? ` ${msg.user.lastName}` : ""),
            username: msg.user.username
        },
        replyTo: msg.replyTo
            ? {
                messageId: Number(msg.replyTo.id), // ✅ แปลงเป็น string
                text     : msg.replyTo.text,
                user     : {
                    id      : Number(msg.replyTo.user.id), // ✅ แปลงเป็น string
                    name    : msg.replyTo.user.firstName + (msg.replyTo.user.lastName ? ` ${msg.replyTo.user.lastName}` : ""),
                    username: msg.replyTo.user.username
                }
            }
            : null
    }));
    res.json(structuredMessages);
});



export default router;