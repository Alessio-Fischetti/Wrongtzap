import { MessageResponse } from "./message.response"
import {UserSummary} from "../models/user.summary";

export type DirectChatResponse = {
    chatId: string,
    messages: MessageResponse[],
    participants: UserSummary[]
    archived: string[]
}
