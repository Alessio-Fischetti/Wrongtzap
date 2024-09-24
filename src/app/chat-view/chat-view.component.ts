import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Chat } from '../app.component';
import { IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  standalone: true,
  imports:[
    IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonMenuButton
  ]
})
export class ChatViewComponent {

  constructor() { }

  @Input() chat?: Chat

}
