import { MessageResponse } from "./message.response"
import { UserResponse } from "./user.response"
import {UserSummary} from "../summaries/user.summary";

export type DirectChatResponse = {
    chatId: string,
    messages: MessageResponse[],
    participants: UserSummary[]
    archived: string[]
}
