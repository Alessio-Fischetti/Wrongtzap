import {Message} from "./message";
import {Chat} from "./base/chat";
import {Profile} from "./profile";

export interface GroupChat extends Chat{
  type: "group"
  readonly chatId: string
  name: string
  messages: Message[]
  participants: Profile[]
  admins: Profile[]
  archived: string[]
}
