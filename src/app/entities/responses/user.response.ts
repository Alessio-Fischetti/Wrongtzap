import {DirectChatResponse} from "./direct.chat.response";
import {Profile} from "../models/profile";
import {GroupChatResponse} from "./group.chat.response";
import {UserSummary} from "../models/user.summary";

export type UserResponse = {
    username: string
    userId: string
    directChats: DirectChatResponse[]
    groupChats: GroupChatResponse[]
    friends: UserSummary[]
}
