import {Message} from "./message";
import {UserSummary} from "../summaries/user.summary";
import {Chat} from "./base/chat";

export interface GroupChat extends Chat{
  type: "group"
  readonly chatId: string
  name: string
  messages: Message[]
  participants: UserSummary[]
  admins: UserSummary[]
  archived: string[]
}
