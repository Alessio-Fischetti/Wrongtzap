import {Message} from "./message";
import {Chat} from "./base/chat";
import { Profile } from "./profile";

export interface DirectChat extends Chat{
  type: "direct"
  readonly chatId: string
  messages: Message[]
  participants: Profile[]
  archived: string[]
}
