/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { IonItem,IonLabel, IonAvatar, IonNote, IonBadge } from "@ionic/angular/standalone";
import { RouterLink, RouterLinkActive } from '@angular/router';

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

@Input() chat!: Chat
@Output() onClickChat = new EventEmitter<Chat>()

get unseenMessages(): number {
  return this.chat.messages.filter( message => message.status != 4).length
}

  constructor() { }

  ngOnInit() {}

}
