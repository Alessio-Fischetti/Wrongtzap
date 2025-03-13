import { Component, Input} from '@angular/core';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { SessionService } from 'src/app/services/session.service';
import { MessageRequest } from 'src/app/entities/requests/message.request';
import { ChatService } from 'src/app/services/chat.service';
import {Chat} from "../../../entities/models/chat";
import {Group} from "../../../entities/models/group";
import {IonicModule} from "@ionic/angular";
import {ProfileService} from "../../../services/profile.service";
import {UserSync} from "../../../config/listeners/user.sync";


@Component({
    selector: 'app-chat-main-content',
    templateUrl: './chat-main-content.component.html',
    styleUrls: ['./chat-main-content-component.scss'],
    imports: [IonicModule, ChatHeaderComponent, ChatFooterComponent, ChatMessageListComponent
    ]
})
export class ChatMainContentComponent {

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private userSync: UserSync,
  ) {
  }

  @Input() chat?: Chat|Group


  newMessage(message: string){
    if(this.chat){
      const user = this.profileService.getProfile().userId
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
    const userId = this.profileService.getProfile().userId
    if(this.chat?.type == "group")
      return this.chat.name
    else{
      if(this.chat?.members[0].userId == userId)
        return this.chat!.members[1].username
      else
        return this.chat!.members[0].username
    }
  }
}
