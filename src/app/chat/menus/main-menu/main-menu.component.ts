import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ChatItemComponent} from "../../components/chat-item/chat-item.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SectionComponent} from "../../../sections/section.component";
import {Chat} from "../../../entities/models/chat";
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

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, ChatItemComponent, FormsModule, FaIconComponent, SectionComponent]
})
export class MainMenuComponent  implements OnInit{

  protected filters = ['Direct Messages', 'Groups', 'Notifications', 'Archived']
  protected selectedFilter: string = 'Groups'
  protected selectedChat?: Chat

  @Output() selectedChatChanged = new EventEmitter<Chat>();
  @Input()  chats: Chat[] = []
  protected filteredChats: Chat[] = []

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
    this.filteredChats = this.chats
  }

  searchChats(input: string){
    this.filteredChats = this.chats.filter(
      chat => chat.name.includes(input)
    )
  }

  updateChatView(event: any){
    console.log(event)
    this.selectedChatChanged.emit(event)
  }

}
