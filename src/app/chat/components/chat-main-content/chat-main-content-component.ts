import { Component, Input} from '@angular/core';
import { Chat } from 'src/app/entities/models/base/chat';
import { IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton, IonAvatar, IonLabel, IonApp, IonFooter } from "@ionic/angular/standalone";
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { SessionService } from 'src/app/services/session.service';
import { Message } from 'src/app/entities/models/message';
import { MessageRequest } from 'src/app/entities/requests/message.request';
import { ChatService } from 'src/app/services/chat.service';
import {DirectChat} from "../../../entities/models/direct.chat";
import {GroupChat} from "../../../entities/models/group.chat";


@Component({
  selector: 'app-chat-main-content',
  templateUrl: './chat-main-content.component.html',
  styleUrls: ['./chat-main-content-component.scss'],
  standalone: true,
  imports:[
    IonApp,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonButtons,
    IonContent,
    IonTitle,
    IonMenuButton,
    IonAvatar,
    IonLabel,
    ChatHeaderComponent,
    ChatFooterComponent,
    ChatMessageListComponent
  ]
})
export class ChatMainContentComponent {

  constructor(
    private sessionService: SessionService,
    private chatService: ChatService
  ) { }

  @Input() chat?: DirectChat|GroupChat

  newMessage(message: string){
    const user = this.sessionService.getProfile().userId

    const request: MessageRequest = {
      userId: user,
      chatId: this.chat!.chatId,
      body: message,
      timestamp: Date.now()
    }

    this.chatService.sendMessage(request)
  }


  getName(): string{
    if(this.chat?.type == "group")
      return this.chat.name
    else
      return `${this.chat?.participants[0].username}-${this.chat?.participants[1].username}`
  }
}
