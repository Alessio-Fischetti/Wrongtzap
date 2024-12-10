import { Message } from "./message"
import { User } from "./user"
import {UserSummary} from "../summaries/user.summary";

export interface Chat {
    readonly chatId: string,
    name: string,
    messages: Message[]
    participants: UserSummary[]
    readonly isGroup: boolean
}
