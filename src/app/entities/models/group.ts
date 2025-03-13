import {Message} from "./message";
import {BaseChat} from "./base/base.chat";
import {Profile} from "./profile";
import {PagedMessage} from "./paged/paged.message";

export interface Group extends BaseChat{
  type: "group"
  readonly chatId: string
  name: string
  messages: PagedMessage
  members: Profile[]
  admins: Profile[]
  archived: string[]
}
