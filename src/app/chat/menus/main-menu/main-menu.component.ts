import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ChatItemComponent} from "../../components/chat-item/chat-item.component";
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
import {FileService} from "../../../services/file.service";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {ChipModule} from "primeng/chip";
import {ChipFilterComponent} from "../../../sections/chip-filter/chip-filter.component";
import {ChatSync} from "../../../config/listeners/chat.sync";

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
    imports: [IonicModule, ChatItemComponent, FormsModule, MenubarModule, ChipModule, ChipFilterComponent]
})
export class MainMenuComponent {

  constructor(
    private chatService: ChatService,
    readonly chatSync: ChatSync,
    protected fileService: FileService,
  ) {

    addIcons({
      mailOutline, mailSharp, paperPlaneOutline,
      paperPlaneSharp, heartOutline, heartSharp,
      archiveOutline, archiveSharp, trashOutline,
      trashSharp, warningOutline, warningSharp,
      bookmarkOutline, bookmarkSharp
    });
  }

  protected filters: MenuItem[] = [
    {
      label: 'Direct',
      icon: 'pi pi-comment'
    },
    {
      label: 'Groups',
      icon: 'pi pi-comments'
    },
    {
      label: 'Notifications',
      icon: 'pi pi-bell'
    },
    {
      label: 'Archived',
      icon: 'pi pi-download'
    }
  ]

  @Output() selectedChatChanged = new EventEmitter<DirectChat|GroupChat>();

  protected selectedFilter: string = 'Groups'
  protected selectedChat?: Chat

  protected filteredDirectChats: DirectChat[] = []
  protected filteredGroups: GroupChat[] = []
  protected loading: boolean = true;
  protected search: string =''

  searchChats(name: string){
    const chats = this.chatSync.chats()
    this.filteredDirectChats = chats.filter(
      chat =>
        chat.participants[0].username.includes(name) || chat.participants[1].username.includes(name)
    )
  }

  searchGroups(name: string){
    const groups = this.chatSync.groups()
    this.filteredGroups = groups.filter(
      group => group.name.includes(name)
    )
  }

  updateChatView(event: any){
    this.selectedChatChanged.emit(event)
  }

  changeFilter(selection: string | undefined){
    if(selection)
      this.selectedFilter = selection;
  }

}
