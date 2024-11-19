import { Message } from "./message"
import { User } from "./user"

export interface Chat {
    readonly chatId: string,
    name: string,
    messages: Message[]
    participants: User[]
    readonly isGroup: boolean
}