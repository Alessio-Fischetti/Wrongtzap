import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Chat } from '../app.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  standalone: true,
  imports:[

  ]
})
export class ChatViewComponent {

  constructor() { }

  @Input() chat!: Chat

}
