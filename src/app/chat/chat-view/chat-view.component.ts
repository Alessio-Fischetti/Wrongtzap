import { Component, Input} from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton, IonAvatar, IonLabel, IonApp, IonFooter } from "@ionic/angular/standalone";
import { ChatHeaderComponent } from '../components/chat-header/chat-header.component';
import { ChatFooterComponent } from '../components/chat-footer/chat-footer.component';
import { ChatContentComponent } from '../components/chat-content/chat-content.component';
import { SessionService } from 'src/app/services/session.service';
import { Message } from 'src/app/models/message';
import { MessageRequest } from 'src/app/requests/message.request';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
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
    ChatContentComponent
  ]
})
export class ChatViewComponent {

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
    console.log(request)
  }
}
