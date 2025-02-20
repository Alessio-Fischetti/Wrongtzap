
import {DirectChat} from "./direct.chat";
import {GroupChat} from "./group.chat";
import {Profile} from "./profile";
import {Friend} from "./friend";

export interface User{
  profile: Profile
  directChats: DirectChat[]
  groupChats: GroupChat[]
  friends: Friend[]
}
