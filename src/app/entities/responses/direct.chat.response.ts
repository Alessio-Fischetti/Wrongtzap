import { MessageResponse } from "./message.response"
import {UserSummary} from "../models/user.summary";

export type DirectChatResponse = {
    chatId: number,
    messages: MessageResponse[],
    participants: UserSummary[]
    archived: string[]
}
