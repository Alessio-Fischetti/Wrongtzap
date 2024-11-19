import { MessageResponse } from "./message.response"
import { UserResponse } from "./user.response"

export type ChatResponse = {
    chatId: string,
    name: string,
    messages: MessageResponse[],
    participants: UserResponse[]
    isGroup: boolean
}