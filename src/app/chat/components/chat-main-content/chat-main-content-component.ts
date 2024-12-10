import { Component, Input} from '@angular/core';
import { Chat } from 'src/app/entities/models/chat';
import { IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton, IonAvatar, IonLabel, IonApp, IonFooter } from "@ionic/angular/standalone";
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { SessionService } from 'src/app/services/session.service';
import { Message } from 'src/app/entities/models/message';
import { MessageRequest } from 'src/app/entities/requests/message.request';
import { ChatService } from 'src/app/services/chat.service';


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

  @Input() chat?: Chat

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
}
