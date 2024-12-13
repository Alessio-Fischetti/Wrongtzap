import {Message} from "./message";
import {UserSummary} from "../summaries/user.summary";
import {Chat} from "./base/chat";

export interface DirectChat extends Chat{
  type: "direct"
  readonly chatId: string
  messages: Message[]
  participants: UserSummary[]
  archived: string[]
}
