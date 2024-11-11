import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { FilterChatComponent } from '../filter-chat/filter-chat.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { Chat } from '../models/chat';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { SessionService } from '../services/session.service';
import { UserDisplay } from '../models/userDisplay';

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
export class ChatComponent implements OnInit, OnDestroy {

  protected filters = ['All', 'Chats', 'Groups', 'Unreads']
  protected selectedFilter: string = 'All' 
  protected selectedChat?: Chat

  protected chatList: Chat[] = []
  protected chatSub!: Subscription

  protected userData!: UserDisplay

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService
  ) {
    addIcons({ 
      mailOutline, mailSharp, paperPlaneOutline, 
      paperPlaneSharp, heartOutline, heartSharp, 
      archiveOutline, archiveSharp, trashOutline, 
      trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp
    });
  }

  ngOnInit(): void {
    this.userData = this.sessionService.getDisplayData()
    this.chatSub = this.chatService.retrieveEveryChat().subscribe({
      next: (resolve) => {
        this.chatList = resolve.data.everyChat
      },
      error: (err) => {
        console.log(err)
      } 
    })
  }

  ngOnDestroy(): void {
    if(this.chatSub)
      this.chatSub.unsubscribe()
  }
}
