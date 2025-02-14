import {Message} from "../message";

export interface Chat {
  chatId: number;
  messages: Message[];
}
