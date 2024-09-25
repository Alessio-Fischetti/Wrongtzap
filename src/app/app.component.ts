import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { FilterChatComponent } from './filter-chat/filter-chat.component';
import { ChatItemComponent } from './chat/components/chat-item/chat-item.component';
import { ChatViewComponent } from './chat/chat-view/chat-view.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonFooter, IonCol, IonRow, IonGrid, RouterLink,
     RouterLinkActive,
      CommonModule,
       IonApp,
       ChatItemComponent,
       ChatViewComponent,
        IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,FilterChatComponent],

})
export class AppComponent {

  protected filters = ['All', 'Chats', 'Groups', 'Unreads']
  protected selectedFilter: string = 'All' 
  protected selectedChat?: Chat
  
  protected mockedChats = [
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date(), received: true, status: Status.RECEIVED}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date(), received: true, status: Status.RECEIVED}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date(), received: true, status: Status.RECEIVED}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date(), received: true, status: Status.RECEIVED}]}
  ]

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }
}


export interface Chat{
  chatName: string
   messages: Message[]
}

export class Message{
  message: string
  timeStamp: Date
  received: boolean
  status: Status

  constructor(message: string, timeStamp: Date, received: boolean, status?: Status){
    this.message = message
    this.timeStamp = timeStamp
    this.received = received
    this.status = status || Status.RECEIVED
  }

}

export enum Status{
  NONE,
  SENT,
  DELIVERED,
  RECEIVED
}