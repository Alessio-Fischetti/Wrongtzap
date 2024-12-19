
import {DirectChat} from "./direct.chat";
import {GroupChat} from "./group.chat";
import {Profile} from "./profile";

export interface User{
  profile: Profile
  directChats: DirectChat[]
  groupChats: GroupChat[]
  friends: Profile[]
}
