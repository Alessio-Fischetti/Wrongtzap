import {Chat} from "./chat";
import {UserSummary} from "../summaries/user.summary";

export class User{

  readonly userId: string
  private username: string
  private chats: Chat[]
  private friends: UserSummary[]

  constructor( userId: string, username: string, chats: Chat[], friends: UserSummary[]) {
    this.userId = userId
    this.username = username
    this.chats = chats
    this.friends = friends
  }

  getUsername(){
    return this.username
  }

  getChats(){
    return this.chats
  }

  getFriends(){
    return this.friends
  }

  editUsername(name:string){
    this.username = name
  }

  addChat(chat: Chat){
    this.chats.push(chat)
  }

}
