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
import { Profile } from '../models/profile';
import { ConversionService } from '../services/conversion.service';
import { MessageResponse } from '../responses/message.response';

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

  chatList: Chat[] = []
  protected chatSub!: Subscription

  protected userData!: Profile

  constructor(
    private chatService: ChatService,
    private conversionService: ConversionService,
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
    this.userData = this.sessionService.getProfile()
    this.chatSub = this.chatService.retrieveEveryChat().subscribe({
      next: (resolve) => {
        this.chatList = this.conversionService.convertChats(resolve.data.everyChat)
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.chatService.messageListenerInit().subscribe({
      next: (event) => {
        if (event){
          const message = this.conversionService.convertMessage(event)
          const chat = this.chatList.find((chat) => chat.chatId == message.chatId)
          if(chat){
            chat.messages.push(message)
          }
        }
        
      }
    })
  }



  ngOnDestroy(): void {
    if(this.chatSub)
      this.chatSub.unsubscribe()
  }
}
