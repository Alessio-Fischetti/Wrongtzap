import {Message} from "../message";

export interface Chat {
  chatId: string;
  messages: Message[];
}
