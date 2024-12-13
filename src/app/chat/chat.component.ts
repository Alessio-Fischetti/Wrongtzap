import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { ChatMainContentComponent } from './components/chat-main-content/chat-main-content-component';
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faList, faUser, faGear, faCommentMedical, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {MainMenuComponent} from "./menus/main-menu/main-menu.component";
import {CreationMenuComponent} from "./menus/creation-menu/creation-menu.component";
import {FormsModule} from "@angular/forms";
import {FriendsMenuComponent} from "./menus/friends-menu/friends-menu.component";
import {SessionService} from "../services/session.service";
import {Profile} from "../entities/models/profile";
import {User} from "../entities/models/user";
import {firstValueFrom, Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {MappingService} from "../services/mapping.service";
import {DirectChat} from "../entities/models/direct.chat";
import {GroupChat} from "../entities/models/group.chat";
import {ChatListener} from "../config/listeners/chat.listener";
import {UserListener} from "../config/listeners/user.listener";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule,
    MainMenuComponent,
    FriendsMenuComponent,
    CreationMenuComponent,
    FormsModule,
    CommonModule,
    ChatMainContentComponent,
    FontAwesomeModule],
})

export class ChatComponent implements OnInit, OnDestroy {

  protected options: [string, IconDefinition][] = [
    ['Options',faGear],
    ['Friends', faUserGroup],
    ['Creation', faCommentMedical],
    ['List', faList],
    ['Profile', faUser]
  ]

  protected selectedPage: string = 'List'
  protected selectedChat?: DirectChat|GroupChat
  protected profile!: Profile
  protected user!: User
  protected loading: boolean = true;

  constructor(
    private session: SessionService,
    private userService: UserService,
    private chatListener: ChatListener,
    private userListener: UserListener,
    private mapping : MappingService,
  ) {
    addIcons({
      mailOutline, mailSharp, paperPlaneOutline,
      paperPlaneSharp, heartOutline, heartSharp,
      archiveOutline, archiveSharp, trashOutline,
      trashSharp, warningOutline, warningSharp,
      bookmarkOutline, bookmarkSharp
    });
  }


  ngOnInit() {
    this.profile = this.session.getProfile()
    this.loadUser(this.profile.userId).then(
      () => {
        this.chatListener.directChatListener(this.user)
        this.chatListener.directMessageListener(this.user)
        this.chatListener.groupChatListener(this.user)
        this.chatListener.groupMessageListener(this.user)
        this.userListener.friendListener(this.user, this.profile.userId)
        this.loading = false
      }
    )
  }


  ngOnDestroy(): void {
    this.chatListener.unsubscribe()
    this.userListener.unsubscribe()
  }

  async loadUser(id: string): Promise<void> {
    const response = await firstValueFrom(this.userService.retrieveUser(id));
    this.user = this.mapping.userConversion(response.data.user);
  }

  changeSelectedChat(chat: DirectChat|GroupChat) {
    this.selectedChat = chat
  }
}
