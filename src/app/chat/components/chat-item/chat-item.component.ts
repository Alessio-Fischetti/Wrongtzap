import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from '../../../app.component';
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
@Output() onClickChat: EventEmitter<Chat> = new EventEmitter<Chat>()
  constructor() { }

  ngOnInit() {}

}
