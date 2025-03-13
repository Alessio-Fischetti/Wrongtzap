
import {Chat} from "./chat";
import {Group} from "./group";
import {Profile} from "./profile";
import {Friend} from "./friend";
import {PagedGroup} from "./paged/paged.group";
import {PagedChat} from "./paged/paged.chat";

export interface User{
  profile: Profile
  chats: PagedChat
  groups: PagedGroup
  friends: Friend[]
}
