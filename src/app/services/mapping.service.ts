import { Inject, Injectable } from "@angular/core";
import { Chat } from "../entities/models/chat";
import { User } from "../entities/models/user";
import { Message } from "../entities/models/message";
import { Status } from "../entities/models/status";
import { timestamp } from "rxjs";
import { MessageResponse } from "../entities/responses/message.response";
import { ChatResponse } from "../entities/responses/chat.response";
import {UserResponse} from "../entities/responses/user.response";
import {UserService} from "./user.service";
import {UserSummary} from "../entities/summaries/user.summary";

@Injectable({
    providedIn: 'root'
})
export class MappingService {

    convertUser(user: UserResponse): User{
      return new User(
        user.userId,
        user.username,
        this.convertChats(user.chats),
        user.friends
      )
    }

    convertChats(chats: ChatResponse[]): Chat[]{
      return chats.map(chat => ({
        chatId: chat.chatId,
        name: chat.name,
        participants: chat.participants,
        messages: this.convertMessages(chat.messages),
        isGroup: chat.isGroup
    }));
    }

    convertMessages(array: ReadonlyArray<MessageResponse>): Message[]{
        return array.map(message => {
            return new Message(message)
        })
    }

    convertMessage(message: MessageResponse): Message{
        return new Message(message)
    }
}
