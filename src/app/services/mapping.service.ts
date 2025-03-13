import {Injectable} from "@angular/core";
import {User} from "../entities/models/user";
import {Message} from "../entities/models/message";
import {Status} from "../entities/models/status";
import {MessageResponse} from "../entities/responses/message.response";
import {ChatResponse} from "../entities/responses/chat.response";
import {UserResponse} from "../entities/responses/user.response";
import {GroupResponse} from "../entities/responses/group.response";
import {Group} from "../entities/models/group";
import {Chat} from "../entities/models/chat";
import {Profile} from "../entities/models/profile";
import {UserSummary} from "../entities/models/user.summary";
import {FriendResponse} from "../entities/responses/friend.response";
import {Friend} from "../entities/models/friend";
import {PagedGroupResponse} from "../entities/responses/paged/paged.group.response";
import {PagedGroup} from "../entities/models/paged/paged.group";
import {pagedGroup} from "../config/graph/graph.fragments";
import {PagedChatResponse} from "../entities/responses/paged/paged.chat.response";
import {PagedChat} from "../entities/models/paged/paged.chat";
import {PagedMessageResponse} from "../entities/responses/paged/paged.message.response";
import {PagedMessage} from "../entities/models/paged/paged.message";

@Injectable({
    providedIn: 'root'
})
export class MappingService {


    userConversion(user: UserResponse): User{
      console.log(this)
      return {
        profile: {
          userId: user.userId,
          username: user.username,
          image: ''
        },
        chats: this.pagedChatConversion(user.chats),
        groups: this.pagedGroupConversion(user.groups),
        friends: user.friends.map((friend) => this.friendConversion(friend))
      }
    }

    pagedGroupConversion(page: PagedGroupResponse): PagedGroup{
      return {
        ...page,
        content: page.content.map((group) => this.groupConversion(group)),
      }
    }

    pagedChatConversion(page: PagedChatResponse): PagedChat{
      return  {
        ...page,
        content: page.content.map((chat) => this.chatConversion(chat)),
      }
    }

    pagedMessageConversion(page: PagedMessageResponse): PagedMessage{
      return  {
        ...page,
        content: page.content.map((message) => this.messageConversion(message)),
      }
    }

    profileConversion(profile: UserSummary): Profile{
      return {
        userId: profile.userId,
        username: profile.username,
        image: ''
      }
    }

    friendConversion(friend: FriendResponse): Friend{
      return {
        friendshipId: friend.friendshipId,
        userId: friend.userId,
        username: friend.username,
        image: '',
        status: friend.status
      }
    }


    chatConversion(chat: ChatResponse): Chat{
      console.log(chat)
      console.log(chat.members)
      return {
        type: "direct",
        chatId: chat.chatId,
        members: chat.members.map((member) => this.profileConversion(member)),
        messages: this.pagedMessageConversion(chat.messages),
        archived: chat.archived
      }
    }


  groupConversion(chat: GroupResponse): Group{
    return {
      type: "group",
      chatId: chat.chatId,
      name: chat.name,
      members: chat.members.map((member) => this.profileConversion(member)),
      admins: chat.admins.map((admin) => this.profileConversion(admin)),
      messages: this.pagedMessageConversion(chat.messages),
      archived: chat.archived
    }
  }

  messageConversion(message: MessageResponse): Message{
        return {
          username: message.username,
          userId: message.userId,
          chatId: message.chatId,
          timestamp: new Date(message.timestamp),
          content: message.content,
          status: Status.RECEIVED
        }
    }
}
