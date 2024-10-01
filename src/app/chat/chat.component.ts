import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { FilterChatComponent } from '../filter-chat/filter-chat.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { Chat, Status } from '../app.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    ChatItemComponent,
    ChatViewComponent,
    FilterChatComponent],

})
export class ChatComponent {

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
