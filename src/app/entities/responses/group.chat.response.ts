import {MessageResponse} from "./message.response";
import {UserSummary} from "../models/user.summary";

export type GroupChatResponse = {
  chatId: number,
  name: string,
  messages: MessageResponse[],
  participants: UserSummary[],
  admins: UserSummary[],
  archived: string[]
}
