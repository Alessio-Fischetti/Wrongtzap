import {DirectChatResponse} from "./direct.chat.response";
import {Profile} from "../models/profile";
import {UserSummary} from "../summaries/user.summary";
import {GroupChat} from "../models/group.chat";
import {GroupChatResponse} from "./group.chat.response";

export type UserResponse = {
    username: string
    userId: string
    directChats: DirectChatResponse[]
    groupChats: GroupChatResponse[]
    friends: UserSummary[]
}
