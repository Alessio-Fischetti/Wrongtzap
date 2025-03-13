import {Message} from "./message";
import {BaseChat} from "./base/base.chat";
import { Profile } from "./profile";
import {PagedMessage} from "./paged/paged.message";

export interface Chat extends BaseChat{
  type: "direct"
  readonly chatId: string
  messages: PagedMessage
  members: Profile[]
  archived: string[]
}
