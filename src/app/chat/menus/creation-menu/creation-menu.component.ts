import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UserSummary} from "../../../entities/models/user.summary";
import {BaseChat} from "../../../entities/models/base/base.chat";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCommentMedical, faX} from "@fortawesome/free-solid-svg-icons";
import {Chat} from "../../../entities/models/chat";
import {ChatService} from "../../../services/chat.service";
import {Group} from "../../../entities/models/group";
import {Button} from "primeng/button";
import {SearchbarComponent} from "../../../sections/searchbar/searchbar.component";
import {DrawerModule} from "primeng/drawer";
import {UploadAvatarComponent} from "../../../sections/upload-avatar/upload-avatar.component";
import {group} from "@angular/animations";
import {ChatSync} from "../../../config/listeners/chat.sync";
import {UserSync} from "../../../config/listeners/user.sync";
import {Friend} from "../../../entities/models/friend";

@Component({
    selector: 'app-creation-menu',
    templateUrl: './creation-menu.component.html',
    styleUrls: ['./creation-menu.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FaIconComponent, FormsModule, Button, SearchbarComponent, DrawerModule, UploadAvatarComponent]
})
export class CreationMenuComponent implements OnInit{

  constructor(
    private chatService: ChatService,
    readonly chatSync: ChatSync,
    readonly userSync : UserSync,
  ) {
    this.newGroup= new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }

  @Output()chatEvent = new EventEmitter<Chat>()

  protected newGroup!: FormGroup;
  protected filter: string = ""
  protected filteredFriends: UserSummary[] = []
  protected selectedFriends: UserSummary[] = []
  protected isGroupMenu: boolean = false;
  protected isGroupProfile: boolean = false;

  protected readonly faX = faX;


  ngOnInit() {
    this.filteredFriends = this.userSync.friends()
  }


  filterFriends(friendId: any) {
    const friends = this.userSync.friends()
    this.filteredFriends = friends.filter(
      friend => friend.userId == friendId)
  }


  selectFriend(selectedFriend: UserSummary){
    if (this.isGroupMenu){
      if(!this.selectedFriends.includes(selectedFriend))
        this.selectedFriends.push(selectedFriend)
    }else
      this.newDirectChat(selectedFriend.userId)
  }

  deselectFriend(selectedFriend: UserSummary){
    this.selectedFriends = this.selectedFriends.filter( friend => selectedFriend.userId != friend.userId)
  }

  newDirectChat(userId: string) {
    const chats = this.chatSync.chats().content
    const profile = this.userSync.profile()
    const chatExists = chats.find(
      (chat) =>
        chat.members[0].userId == userId || chat.members[1].userId == userId
    )

    if(chatExists != undefined){
      this.chatEvent.emit(chatExists)
    }else{
      this.chatService.createChat({firstUserId: profile.userId, secondUserId: userId})
    }
  }

  newGroupChat() {
    const profile = this.userSync.profile()
    if(this.newGroup.valid && this.name && this.selectedFriends.length > 0){
      const name = this.name.value
      const userIds = this.selectedFriends.map(friend => friend.userId)
      userIds.push(profile.userId)
      const adminId = profile.userId

      this.chatService.createGroup({name: name, adminId: adminId, userIds: userIds})
    }
  }

  toggleBottomButton(){
    if(this.isGroupMenu){
      this.isGroupMenu = false
      this.isGroupProfile = true
    }
    else{
      this.isGroupProfile = false
      this.isGroupMenu = true
    }
  }
  get name(){
    return this.newGroup.get("name")
  }


  protected readonly group = group;
}
