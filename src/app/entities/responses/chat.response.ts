import { MessageResponse } from "./message.response"
import { UserResponse } from "./user.response"
import {UserSummary} from "../summaries/user.summary";

export type ChatResponse = {
    chatId: string,
    name: string,
    messages: MessageResponse[],
    participants: UserSummary[]
    isGroup: boolean
}
