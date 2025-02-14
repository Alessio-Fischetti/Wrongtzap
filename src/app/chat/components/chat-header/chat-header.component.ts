import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonAvatar, IonTitle, IonMenuButton } from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'chat-header',
    templateUrl: './chat-header.component.html',
    styleUrls: ['./chat-header.component.scss'],
    imports: [IonicModule]
})
export class ChatHeaderComponent {

  constructor() { }

  @Input() chatName?: string

  ngOnInit() {}

}
