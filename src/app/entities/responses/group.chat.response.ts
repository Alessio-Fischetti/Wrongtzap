import {MessageResponse} from "./message.response";
import {UserSummary} from "../summaries/user.summary";

export type GroupChatResponse = {
  chatId: string,
  name: string,
  messages: MessageResponse[],
  participants: UserSummary[],
  admins: UserSummary[],
  archived: string[]
}
