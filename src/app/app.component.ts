import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { FilterChatComponent } from './filter-chat/filter-chat.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink,
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
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date()}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date()}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date()}]},
    {chatName: 'Mattia', messages: [{message: 'ciao', timeStamp: new Date()}]}
  ]

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }
}


export interface Chat{
  chatName: string
   messages: Message[]
}

export interface Message{
  message: string
  timeStamp: Date
}