import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ChatItemComponent} from "../../components/chat-item/chat-item.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SectionComponent} from "../../../sections/section.component";
import {Chat} from "../../../entities/models/base/chat";
import {ChatService} from "../../../services/chat.service";
import {MappingService} from "../../../services/mapping.service";
import {SessionService} from "../../../services/session.service";
import {addIcons} from "ionicons";
import {
  archiveOutline, archiveSharp, bookmarkOutline,
  bookmarkSharp, heartOutline, heartSharp,
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp,
  trashOutline, trashSharp, warningOutline, warningSharp
} from "ionicons/icons";
import {FormsModule} from "@angular/forms";
import {DirectChat} from "../../../entities/models/direct.chat";
import {GroupChat} from "../../../entities/models/group.chat";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, ChatItemComponent, FormsModule, FaIconComponent, SectionComponent]
})
export class MainMenuComponent  implements OnInit{

  protected filters = ['Direct', 'Groups', 'Notifications', 'Archived']
  protected selectedFilter: string = 'Groups'
  protected selectedChat?: Chat

  @Output() selectedChatChanged = new EventEmitter<DirectChat|GroupChat>();
  @Input()  chats!: {direct: DirectChat[], group: GroupChat[]}

  protected filteredDirectChats: DirectChat[] = []
  protected filteredGroups: GroupChat[] = []

  protected loading: boolean = true;
  protected search: string =''

  constructor(
    private chatService: ChatService,
    private conversionService: MappingService,
    private sessionService: SessionService,
  ) {
    addIcons({
      mailOutline, mailSharp, paperPlaneOutline,
      paperPlaneSharp, heartOutline, heartSharp,
      archiveOutline, archiveSharp, trashOutline,
      trashSharp, warningOutline, warningSharp,
      bookmarkOutline, bookmarkSharp
    });
  }

  ngOnInit(): void {
    this.filteredGroups = this.chats.group
    this.filteredDirectChats = this.chats.direct
  }

  searchChats(name: string){
    this.filteredDirectChats= this.chats.direct.filter(
      chat =>
        chat.participants[0].username.includes(name) || chat.participants[1].username.includes(name)
    )
  }

  searchGroups(name: string){
    this.filteredGroups = this.chats.group.filter(
      group => group.name.includes(name)
    )
  }

  updateChatView(event: any){
    this.selectedChatChanged.emit(event)
  }

}
