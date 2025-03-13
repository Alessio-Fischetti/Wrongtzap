import {Message} from "../message";
import {PagedMessage} from "../paged/paged.message";

export interface BaseChat {
  chatId: string;
  messages: PagedMessage;
}
