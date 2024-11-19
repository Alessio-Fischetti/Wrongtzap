import { Status } from "./status";

export class Message{

  readonly sender: string;
  readonly chatId: string;
  readonly timestamp: Date;
  private  body: string;
  private  status: Status;

  constructor(body: string, sender: string, chatId: string,  timestamp: number){
    this.sender = sender,
    this.chatId = chatId
    this.body = body
    this.timestamp = new Date(timestamp)
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