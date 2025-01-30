
interface TelegramMessage {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    text: string;
    reply_to_message: TelegramMessage;
}
interface Chat {
    id: number;
    title: string;
    type: string;
    all_members_are_administrators: boolean;
}
interface From {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string | null;
    username: string | null;
    language_code: string | null;
    is_premium: boolean;
}
interface RequestWithChatId extends Request {
    params: { chatId: string };
}




export type { TelegramMessage, Chat, From, RequestWithChatId };
