import { MessageResponse } from "./message.response"
import {UserSummary} from "../models/user.summary";
import {PagedMessageResponse} from "./paged/paged.message.response";

export type ChatResponse = {
    chatId: string,
    messages: PagedMessageResponse,
    members: UserSummary[]
    archived: string[]
}
