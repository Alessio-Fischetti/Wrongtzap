import {UserSummary} from "../summaries/user.summary";
import {DirectChat} from "./direct.chat";
import {GroupChat} from "./group.chat";

export interface User{
  readonly userId: string
  username: string
  directChats: DirectChat[]
  groupChats: GroupChat[]
  friends: UserSummary[]
}
