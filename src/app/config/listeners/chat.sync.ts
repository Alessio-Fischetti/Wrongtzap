import {Injectable, signal, Signal, Type, WritableSignal} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {Subscription} from "rxjs";
import {MappingService} from "../../services/mapping.service";
import {User} from "../../entities/models/user";
import {Chat} from "../../entities/models/chat";
import {Group} from "../../entities/models/group";
import {BaseChat} from "../../entities/models/base/base.chat";
import {update} from "@angular/build/src/tools/angular/compilation/parallel-worker";
import {PagedGroup} from "../../entities/models/paged/paged.group";
import {PagedChat} from "../../entities/models/paged/paged.chat";
import {PagedChatResponse} from "../../entities/responses/paged/paged.chat.response";
import {PagedMessage} from "../../entities/models/paged/paged.message";
import {Message} from "../../entities/models/message";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../entities/models/profile";

@Injectable({
  providedIn: 'root'
})
export class ChatSync {

  constructor(
    private chatService: ChatService,
    private mapping: MappingService,
    private profileService: ProfileService,
  ) {}

  private profile: Profile = this.profileService.getProfile();
  private subs: Subscription[] = []
  private _groups: WritableSignal<PagedGroup> = signal({} as any)
  private _chats: WritableSignal<PagedChat> = signal({} as any)

  groups!: Signal<PagedGroup>
  chats!: Signal<PagedChat>

  setFirstSignal(chats: PagedChat, groups: PagedGroup) {
    this._groups.set(groups)
    this._chats.set(chats)

    this.groups = this._groups.asReadonly()
    this.chats = this._chats.asReadonly()

    this.directChatListener()
    this.groupChatListener()
    this.directMessageListener()
    this.groupMessageListener()
  }

  directChatListener(){
     this.subs.push(this.chatService.chatListener().subscribe({
       next: (event)=> {
         if (event){
           const newChat = this.mapping.chatConversion(event)
           this._chats.update((page) => {
             return {
               pageNumber: Math.ceil((page.content.length+1) / page.pageSize),
               totalPages: Math.ceil((page.totalRecords+1) / page.pageSize),
               pageSize: page.pageSize,
               totalRecords: page.totalRecords +1,
               content: [newChat, ...page.content]
             }
           })
         }
       }
     })
    )
  }

  pageChatListener(){
    this.subs.push(this.chatService.pageChatListener(this.profile.userId).subscribe({
        next: (event)=> {
          if (event){
            const newChat = this.mapping.pagedChatConversion(event)
            this._chats.update((page) => {
              return {
                pageNumber: page.pageNumber+1,
                totalPages: page.totalPages,
                totalRecords: page.totalRecords,
                pageSize: page.pageSize,
                content: [...page.content, ...newChat.content]
              }
            })
          }
        }
      })
    )
  }


  groupChatListener(){
    this.subs.push(this.chatService.groupListener().subscribe({
        next: (event)=> {
          if(event){
            const newGroup = this.mapping.groupConversion(event)
            this._groups.update((page) => {
              return {
                pageNumber: Math.ceil((page.content.length+1) / page.pageSize),
                totalPages: Math.ceil((page.totalRecords+1) / page.pageSize),
                pageSize: page.pageSize,
                totalRecords: page.totalRecords +1,
                content: [newGroup, ...page.content]
              }
            })
          }
        }
      })
    )
  }

  pageGroupListener(){
    this.subs.push(this.chatService.pageGroupListener(this.profile.userId).subscribe({
        next: (event)=> {
          if (event){
            const newGroup = this.mapping.pagedGroupConversion(event)
            this._groups.update((page) => {
              return {
                pageNumber: page.pageNumber+1,
                totalPages: page.totalPages,
                totalRecords: page.totalRecords,
                pageSize: page.pageSize,
                content: [...page.content, ...newGroup.content]
              }
            })
          }
        }
      })
    )
  }


  directMessageListener() {
    this.subs.push(this.chatService.chatMessageListener().subscribe({
      next: (event) => {
        if (event){
          const message = this.mapping.messageConversion(event)
          this._chats.update((page) =>{
            return {
              ...page,
              content: page.content.map((chat) => {
                return chat.chatId === message.chatId
                ? {
                  ...chat,
                    messages: this.insertMessage(chat.messages, message)
                } :
                  chat
              })
            }
          })
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }



  groupMessageListener(){
    this.subs.push(this.chatService.groupMessageListener().subscribe({
      next: (event) => {
        if (event){
          const message = this.mapping.messageConversion(event)
          this._groups.update((page) =>{
            return {
              ...page,
              content: page.content.map((chat) => {
                return chat.chatId === message.chatId
                  ? {
                    ...chat,
                    messages: this.insertMessage(chat.messages, message)
                  } :
                  chat
              })
            }
          })
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  insertMessage(page: PagedMessage, newMessage: Message): PagedMessage{
    return {
      pageNumber: Math.ceil((page.content.length+1) / page.pageSize),
      totalPages: Math.ceil((page.totalRecords+1) / page.pageSize),
      pageSize: page.pageSize,
      totalRecords: page.totalRecords + 1,
      content: [newMessage, ...page.content]
    }
  }

  unsubscribe() {
    if (this.subs.length > 0){
      this.subs.forEach(sub => sub.unsubscribe())
    }
  }
}
