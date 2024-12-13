/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/entities/models/base/chat';
import { IonItem,IonLabel, IonAvatar, IonNote, IonBadge } from "@ionic/angular/standalone";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Status } from 'src/app/entities/models/status';
import { Message } from 'src/app/entities/models/message';
import {DirectChat} from "../../../entities/models/direct.chat";
import {GroupChat} from "../../../entities/models/group.chat";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: true,
  imports: [IonAvatar,
    IonItem,
    IonLabel,
    RouterLink,
    RouterLinkActive,
    IonNote,
    IonBadge
    ]
})
export class ChatItemComponent  implements OnInit {

@Input() chat!: DirectChat|GroupChat
@Output() onChatClick = new EventEmitter<Chat>()

get unseenMessages(): number {
  return this.chat.messages.reduce((count, message) => {
      return message.status !== Status.SEEN ? count + 1 : count;
  }, 0);
}

getName(): string{
  if(this.chat.type == "group")
    return this.chat.name
  else
    return `${this.chat.participants[0].username}-${this.chat.participants[1].username}`
}

  constructor() { }

  ngOnInit() {}

}
