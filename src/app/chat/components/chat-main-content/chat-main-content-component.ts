import { Component, Input} from '@angular/core';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { SessionService } from 'src/app/services/session.service';
import { MessageRequest } from 'src/app/entities/requests/message.request';
import { ChatService } from 'src/app/services/chat.service';
import {DirectChat} from "../../../entities/models/direct.chat";
import {GroupChat} from "../../../entities/models/group.chat";
import {IonicModule} from "@ionic/angular";


@Component({
    selector: 'app-chat-main-content',
    templateUrl: './chat-main-content.component.html',
    styleUrls: ['./chat-main-content-component.scss'],
    imports: [IonicModule, ChatHeaderComponent, ChatFooterComponent, ChatMessageListComponent
    ]
})
export class ChatMainContentComponent {

  constructor(
    private sessionService: SessionService,
    private chatService: ChatService
  ) { }

  @Input() chat?: DirectChat|GroupChat

  newMessage(message: string){
    if(this.chat){
      const user = this.sessionService.getProfile().userId
      const request: MessageRequest = {
        userId: user,
        chatId: this.chat!.chatId,
        body: message,
        type: this.chat.type
      }

      this.chatService.sendMessage(request)
    }
  }


  getName(): string{
    if(this.chat?.type == "group")
      return this.chat.name
    else
      return `${this.chat?.participants[0].username}-${this.chat?.participants[1].username}`
  }
}
