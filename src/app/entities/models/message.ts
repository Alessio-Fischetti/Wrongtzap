import { Status } from "./status";
import {MessageResponse} from "../responses/message.response";

export class Message{

  readonly sender: string;
  readonly senderId: string;
  readonly chatId: string;
  readonly timestamp: Date;
  private  body: string;
  private  status: Status;

  constructor(message: MessageResponse){
    this.sender = message.username,
    this.senderId = message.userId,
    this.chatId = message.chatId,
    this.body = message.content,
    this.timestamp = new Date(message.timestamp)
    this.status = Status.SENT
  }

  getBody(): String{
    return this.body
  }

  getStatus(): Status{
    return this.status
  }

  setBody(body: string){
    this.body = body
  }

  setStatus(status: Status){
    this.status = status
  }
}
