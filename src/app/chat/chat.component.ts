import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { ChatMainContentComponent } from './components/chat-main-content/chat-main-content-component';
import { Chat } from '../entities/models/chat';
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
import {ChatService} from "../services/chat.service";


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
  protected selectedChat?: Chat
  protected profile!: Profile
  protected user!: User
  protected loading: boolean = true;

  protected subs: Subscription[] = []

  constructor(
    private session: SessionService,
    private userService: UserService,
    private chatService: ChatService,
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
        this.userListener(this.profile.userId)
        this.messageListener()
        this.loading = false
      }
    )
  }


  ngOnDestroy(): void {
    if(this.subs.length > 0){
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

  async loadUser(id: string): Promise<void> {
    const response = await firstValueFrom(this.userService.retrieveUser(id));
    this.user = this.mapping.convertUser(response.data.user);
  }


  messageListener(){
    this.subs.push(this.chatService.messageListenerInit().subscribe({
      next: (event) => {
        if (event){
          const message = this.mapping.convertMessage(event)
          const chat = this.user.getChats().find((chat) => chat.chatId == message.chatId)
          if(chat){
            chat.messages.push(message)
          }
        }

      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  userListener(userId: string){
    this.subs.push(this.userService.userListenerInit(userId).subscribe({
      next: (event) => {
        if (event){
          this.user = this.mapping.convertUser(event)
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  changeSelectedChat(chat: Chat) {
    this.selectedChat = chat
  }
}
