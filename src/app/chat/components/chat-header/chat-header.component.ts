import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonAvatar, IonTitle, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
  imports: [IonTitle, IonAvatar, IonButtons, IonToolbar, IonHeader, IonMenuButton

  ]
})
export class ChatHeaderComponent {

  constructor() { }

  @Input() chatName?: string

  ngOnInit() {}

}
