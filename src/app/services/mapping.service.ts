import {Injectable} from "@angular/core";
import {User} from "../entities/models/user";
import {Message} from "../entities/models/message";
import {Status} from "../entities/models/status";
import {MessageResponse} from "../entities/responses/message.response";
import {DirectChatResponse} from "../entities/responses/direct.chat.response";
import {UserResponse} from "../entities/responses/user.response";
import {GroupChatResponse} from "../entities/responses/group.chat.response";
import {GroupChat} from "../entities/models/group.chat";
import {DirectChat} from "../entities/models/direct.chat";
import {UserSummary} from "../entities/summaries/user.summary";

@Injectable({
    providedIn: 'root'
})
export class MappingService {

    userConversion(user: UserResponse): User{
      return {
        userId:user.userId,
        username: user.username,
        directChats: this.bulkChatConversion(user.directChats),
        groupChats: this.bulkGroupConversion(user.groupChats),
        friends: this.bulkFriendConversion(user.friends),
      }
    }

    bulkFriendConversion(friends: UserSummary[]): UserSummary[]{
      return friends.map(friend => ({
        userId: friend.userId,
        username: friend.username,
      }))
    }

    bulkChatConversion(chats: DirectChatResponse[]): DirectChat[]{
      return chats.map(chat => ({
        type: "direct",
        chatId: chat.chatId,
        participants: chat.participants,
        messages: this.bulkMessageConversion(chat.messages),
        archived: this.bulkIdConversion(chat.archived),
    }));
    }

    bulkGroupConversion(chats: GroupChatResponse[]): GroupChat[]{
      return chats.map(chat => ({
        type: "group",
        chatId: chat.chatId,
        name: chat.name,
        participants: this.bulkSummaryConversion(chat.participants),
        admins: this.bulkSummaryConversion(chat.admins),
        messages: this.bulkMessageConversion(chat.messages),
        archived: this.bulkIdConversion(chat.archived)
      }))
    }

    bulkMessageConversion(array: ReadonlyArray<MessageResponse>): Message[]{
        return array.map(message => ({
          sender: message.username,
          senderId: message.userId,
          chatId: message.chatId,
          timestamp: new Date(message.timestamp),
          body: message.content,
          status: Status.RECEIVED
        }))
    }

    bulkSummaryConversion(summary: ReadonlyArray<UserSummary>): UserSummary[]{
      return summary.map(user => ({
        username: user.username,
        userId: user.userId,
      }))
    }

    bulkIdConversion(ids: ReadonlyArray<string>): string[]{
      return ids.map(id => id)
    }


  chatConversion(chat: DirectChatResponse): DirectChat{
    return {
      type: "direct",
      chatId: chat.chatId,
      participants: chat.participants,
      messages: this.bulkMessageConversion(chat.messages),
      archived: chat.archived
    }
  }


  groupConversion(chat: GroupChatResponse): GroupChat{
    return {
      type: "group",
      chatId: chat.chatId,
      name: chat.name,
      participants: chat.participants,
      admins: chat.admins,
      messages: this.bulkMessageConversion(chat.messages),
      archived: chat.archived
    }
  }



    messageConversion(message: MessageResponse): Message{
        return {
          sender: message.username,
          senderId: message.userId,
          chatId: message.chatId,
          timestamp: new Date(message.timestamp),
          body: message.content,
          status: Status.RECEIVED
        }
    }
}
