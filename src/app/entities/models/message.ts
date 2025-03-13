import { Status } from "./status";
import {MessageResponse} from "../responses/message.response";

export type Message = {

  readonly username: string;
  readonly userId: string;
  readonly chatId: string;
  readonly timestamp: Date;
  content: string;
  status: Status;

}
