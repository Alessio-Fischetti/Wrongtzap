import {ChatResponse} from "./chat.response";
import {Profile} from "../models/profile";
import {UserSummary} from "../summaries/user.summary";

export type UserResponse = {
    username: string
    userId: string
    chats: ChatResponse[],
    friends: UserSummary[]
}
