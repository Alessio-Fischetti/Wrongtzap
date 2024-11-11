import { Status } from "./status"

export class message{
    
    sender: string
    body: string
    timestamp: Date
    status: Status

    constructor(
        body: string,
        sender: string
    ){
        this.sender = sender
        this.body = body
        this.timestamp = new Date(Date.now())
        this.status = Status.SENT
    }
}