/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseChat } from 'src/app/entities/models/base/base.chat';
import { IonItem,IonLabel, IonAvatar, IonNote, IonBadge } from "@ionic/angular/standalone";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Status } from 'src/app/entities/models/status';
import { Message } from 'src/app/entities/models/message';
import {Chat} from "../../../entities/models/chat";
import {Group} from "../../../entities/models/group";
import {IonicModule} from "@ionic/angular";
import {ChatService} from "../../../services/chat.service";
import {UserService} from "../../../services/user.service";
import {UserSync} from "../../../config/listeners/user.sync";

@Component({
    selector: 'app-chat-item',
    templateUrl: './chat-item.component.html',
    styleUrls: ['./chat-item.component.scss'],
    imports: [IonicModule]
})
export class ChatItemComponent{

  constructor(
    private userSync: UserSync
  ) {
    this.userId = userSync.profile().userId
  }

  @Input() chat!: Chat|Group
  @Output() onChatClick = new EventEmitter<BaseChat>()
  readonly userId: string

  get unseenMessages(): number {
  return this.chat.messages.content.reduce((count, message) => {
      return message.status !== Status.SEEN ? count + 1 : count;
  }, 0);
  }

  getName(): string{
    if(this.chat.type == "group")
      return this.chat.name
    else {
      if(this.chat.members[0].userId == this.userId)
        return this.chat.members[1].username
      else
        return this.chat.members[0].username
    }
  }
}
