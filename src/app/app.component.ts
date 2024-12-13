import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { SectionComponent } from './sections/section.component';
import { ChatItemComponent } from './chat/components/chat-item/chat-item.component';
import { ChatMainContentComponent } from './chat/components/chat-main-content/chat-main-content-component';
import { Chat } from './entities/models/base/chat';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonFooter, IonCol, IonRow, IonGrid, RouterLink,
     RouterLinkActive,
      CommonModule,
       IonApp,
       ChatItemComponent,
       ChatMainContentComponent,
        IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,SectionComponent],

})
export class AppComponent {

  protected filters = ['All', 'Direct Messages', 'Groups', 'Notifications']
  protected selectedFilter: string = 'All'
  protected selectedChat?: Chat

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }
}
