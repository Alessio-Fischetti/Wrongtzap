import { Inject, Injectable } from "@angular/core";
import { Chat } from "../models/chat";
import { User } from "../models/user";
import { Message } from "../models/message";
import { Status } from "../models/status";
import { timestamp } from "rxjs";
import { MessageResponse } from "../responses/message.response";
import { ChatResponse } from "../responses/chat.response";

@Injectable({
    providedIn: 'root'
})
export class ConversionService{
    convertChats(array: ReadonlyArray<ChatResponse>): Chat[]{
    
    return array.map(chat => ({
        ...chat, 
        messages: this.convertMessages(chat.messages)
    }));
    }

    convertMessages(array: ReadonlyArray<MessageResponse>): Message[]{
        return array.map(message => {
            return new Message(message.content, message.sender, message.chatId, message.timestamp)    
        })
    }
    
    convertMessage(message: MessageResponse): Message{
        return new Message(message.content, message.sender, message.chatId, message.timestamp)
    }
}