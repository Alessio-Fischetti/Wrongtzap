import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Message } from 'src/app/app.component';
import { MessageComponent } from './message/message.component';
@Component({
  selector: 'chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
  standalone: true,
  imports: [IonContent, MessageComponent]
})
export class ChatContentComponent  implements OnInit {

  @Input() messages?: Message[] = []

  constructor() { }

  ngOnInit() {

  }

}
