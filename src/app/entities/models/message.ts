import { Status } from "./status";
import {MessageResponse} from "../responses/message.response";

export interface Message{

  readonly sender: string;
  readonly senderId: string;
  readonly chatId: string;
  readonly timestamp: Date;
  body: string;
  status: Status;
}
