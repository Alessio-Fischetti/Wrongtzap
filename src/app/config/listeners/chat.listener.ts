import {Injectable} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {Subscription} from "rxjs";
import {MappingService} from "../../services/mapping.service";
import {User} from "../../entities/models/user";

@Injectable({
  providedIn: 'root'
})
export class ChatListener {

  subs: Subscription[] = []
  constructor(
    private chatService: ChatService,
    private mapping: MappingService) {}

  directChatListener(user: User){
     this.subs.push(this.chatService.chatListener().subscribe({
       next: (event)=> {
         if(event){
          const chat = this.mapping.chatConversion(event)
          user.directChats.push(chat)
         }
       }
     })
    )
  }


  groupChatListener(user: User){
    this.subs.push(this.chatService.groupListener().subscribe({
        next: (event)=> {
          if(event){
            const chat = this.mapping.groupConversion(event)
            user.groupChats.push(chat)
          }
        }
      })
    )
  }


  directMessageListener(user: User) {
    this.subs.push(this.chatService.chatMessageListener().subscribe({
      next: (event) => {
        if (event){
          const message = this.mapping.messageConversion(event)
          const chat = user.directChats.find((chat) => chat.chatId == message.chatId)
          if(chat){
            chat.messages.push(message)
          }
        }

      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  groupMessageListener(user: User){
    this.subs.push(this.chatService.groupMessageListener().subscribe({
      next: (event) => {
        if (event){
          const message = this.mapping.messageConversion(event)
          const chat = user.groupChats.find((chat) => chat.chatId == message.chatId)
          if(chat){
            chat.messages.push(message)
          }
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
