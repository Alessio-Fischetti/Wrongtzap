import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Status } from 'src/app/models/status';
import { IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton, IonAvatar, IonLabel, IonApp, IonFooter } from "@ionic/angular/standalone";
import { ChatHeaderComponent } from '../components/chat-header/chat-header.component';
import { ChatFooterComponent } from '../components/chat-footer/chat-footer.component';
import { ChatContentComponent } from '../components/chat-content/chat-content.component';

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

  constructor() { }

  @Input() chat?: Chat

  newMessage(message: string){
    this.chat?.messages.push({message: message, timeStamp: new Date(),received :false, status: Status.DELIVERED})    
  }

}
