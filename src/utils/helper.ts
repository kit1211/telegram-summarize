import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function getAllowedGroups(): Promise<Set<bigint>> {
    const groups = await prisma.chat.findMany({
        select: { chatId: true }
    });
    return new Set(groups.map(group => BigInt(group.chatId))); // แปลงเป็น Set
}





export async function saveMessage(message : any) {
    // บันทึกหรืออัปเดต User
    const user = await prisma.user.upsert({
        where: { id: BigInt(message.from.id) },
        update: {},
        create: {
            id          : BigInt(message.from.id),
            isBot       : message.from.is_bot,
            firstName   : message.from.first_name,
            lastName    : message.from.last_name    || null,
            username    : message.from.username     || null,
            languageCode: message.from.language_code || null,
            isPremium   : message.from.is_premium   || false,
        }
    });

    // บันทึกหรืออัปเดต Chat
    const chat = await prisma.chat.upsert({
        where   : { chatId: BigInt(message.chat.id) },
        update  : {},
        create  : {
            chatId: BigInt(message.chat.id),
            title : message.chat.title || "",
            type  : message.chat.type,
        }
    });

    // บันทึก Message
    const newMessage = await prisma.message.create({
        data: {
            id       : BigInt(message.message_id),
            chatId   : chat.chatId,
            userId   : user.id,
            text     : message.text || null,
            timestamp: new Date(message.date * 1000),
            replyToId: message.reply_to_message ? BigInt(message.reply_to_message.message_id) : null
        }
    });
    // console.log("Message saved:", newMessage);
}
