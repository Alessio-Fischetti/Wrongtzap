import { Status } from "./status";
import {MessageResponse} from "../responses/message.response";

export interface Message{

  readonly sender: string;
  readonly senderId: number;
  readonly chatId: number;
  readonly timestamp: Date;
  body: string;
  status: Status;
}
