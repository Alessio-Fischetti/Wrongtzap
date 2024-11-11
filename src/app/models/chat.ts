import { Message } from "../app.component"
import { User } from "./user"

export interface Chat{
    name: string
    messages: Message[]
    participants: User[]
    isGroup: boolean
}