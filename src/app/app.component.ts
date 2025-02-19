import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { Chat } from './entities/models/base/chat';
import {IonicModule} from "@ionic/angular";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [IonicModule, CommonModule]
})
export class AppComponent {

  protected filters = ['All', 'Direct Messages', 'Groups', 'Notifications']
  protected selectedFilter: string = 'All'
  protected selectedChat?: Chat

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }
}
