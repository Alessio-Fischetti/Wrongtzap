import {ChatResponse} from "./chat.response";
import {Profile} from "../models/profile";
import {GroupResponse} from "./group.response";
import {UserSummary} from "../models/user.summary";
import {FriendResponse} from "./friend.response";
import {PagedGroupResponse} from "./paged/paged.group.response";
import {PagedChatResponse} from "./paged/paged.chat.response";

export type UserResponse = {
    username: string
    userId: string
    chats: PagedChatResponse
    groups: PagedGroupResponse
    friends: FriendResponse[]
}
