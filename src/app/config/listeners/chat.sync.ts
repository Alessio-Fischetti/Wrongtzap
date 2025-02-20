import {Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {Subscription} from "rxjs";
import {MappingService} from "../../services/mapping.service";
import {User} from "../../entities/models/user";
import {DirectChat} from "../../entities/models/direct.chat";
import {GroupChat} from "../../entities/models/group.chat";
import {Chat} from "../../entities/models/base/chat";
import {update} from "@angular/build/src/tools/angular/compilation/parallel-worker";

@Injectable({
  providedIn: 'root'
})
export class ChatSync {

  constructor(
    private chatService: ChatService,
    private mapping: MappingService
  ) {}

  private subs: Subscription[] = []
  private _groups: WritableSignal<GroupChat[]> = signal([])
  private _chats: WritableSignal<DirectChat[]> = signal([])

  groups!: Signal<GroupChat[]>
  chats!: Signal<DirectChat[]>

  setFirstSignal(directChats: DirectChat[], groupChats: GroupChat[]) {
    this._groups.set(groupChats)
    this._chats.set(directChats)

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
         if(event){
          const newChat = this.mapping.chatConversion(event)
           this._chats.update((chats) => {
             return [...chats, newChat]
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
            this._groups.update((groups) => {
              return [...groups, newGroup]
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
          this._chats.update((chats) => {
            return chats.map(chat =>
              chat.chatId === message.chatId
                ? {
                  ...chat,
                  messages: [...chat.messages, message]
                }
                : chat
            );
          });
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
          this._groups.update((groups) => {
            return groups.map(group =>
              group.chatId === message.chatId
                ? {
                  ...group,
                  messages: [...group.messages, message]
                }
                : group
            );
          });
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  unsubscribe() {
    if (this.subs.length > 0){
      this.subs.forEach(sub => sub.unsubscribe())
    }
  }
}
