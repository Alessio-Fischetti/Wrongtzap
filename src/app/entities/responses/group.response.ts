import {MessageResponse} from "./message.response";
import {UserSummary} from "../models/user.summary";
import {PagedMessageResponse} from "./paged/paged.message.response";

export type GroupResponse = {
  chatId: string,
  name: string,
  messages: PagedMessageResponse,
  members: UserSummary[],
  admins: UserSummary[],
  archived: string[]
}
