import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UserSummary} from "../../../entities/models/user.summary";
import {Chat} from "../../../entities/models/base/chat";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCommentMedical, faX} from "@fortawesome/free-solid-svg-icons";
import {DirectChat} from "../../../entities/models/direct.chat";
import {ChatService} from "../../../services/chat.service";
import {GroupChat} from "../../../entities/models/group.chat";
import {Button} from "primeng/button";
import {SearchbarComponent} from "../../../sections/searchbar/searchbar.component";
import {DrawerModule} from "primeng/drawer";
import {UploadAvatarComponent} from "../../../sections/upload-avatar/upload-avatar.component";
import {group} from "@angular/animations";

@Component({
    selector: 'app-creation-menu',
    templateUrl: './creation-menu.component.html',
    styleUrls: ['./creation-menu.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FaIconComponent, FormsModule, Button, SearchbarComponent, DrawerModule, UploadAvatarComponent]
})
export class CreationMenuComponent  implements OnInit {
  @Input()friends!: UserSummary[]
  @Input()chats!: DirectChat[]
  @Input()userId!: string
  @Output()chatEvent = new EventEmitter<DirectChat>()

  protected newGroup!: FormGroup;
  protected filter: string = ""
  protected filteredFriends: UserSummary[] = []
  protected selectedFriends: UserSummary[] = []
  protected isGroupMenu: boolean = false;
  protected isGroupProfile: boolean = false;
  protected selectionIsMade: boolean = true

  protected readonly faX = faX;

  constructor(
    private chatService: ChatService,
  ) {
    this.newGroup= new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }

  ngOnInit() {
    this.filteredFriends = this.friends
  }

  filterFriends(friendId: any) {
    this.filteredFriends = this.friends.filter(
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
    const chatExists = this.chats.find(
      (chat) =>
        chat.participants[0].userId == userId || chat.participants[1].userId == userId
    )

    if(chatExists != undefined){
      this.chatEvent.emit(chatExists)
    }else{
      this.chatService.createChat({firstUserId: this.userId, secondUserId: userId})
    }
  }

  newGroupChat() {
    if(this.newGroup.valid && this.name && this.selectedFriends.length > 0){
      const name = this.name.value
      const userIds = this.selectedFriends.map(friend => friend.userId)
      userIds.push(this.userId)
      const adminId = this.userId

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
