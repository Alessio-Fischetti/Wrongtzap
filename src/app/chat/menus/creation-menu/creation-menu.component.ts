import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UserSummary} from "../../../entities/summaries/user.summary";
import {Chat} from "../../../entities/models/base/chat";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCommentMedical} from "@fortawesome/free-solid-svg-icons";
import {DirectChat} from "../../../entities/models/direct.chat";

@Component({
  selector: 'app-creation-menu',
  templateUrl: './creation-menu.component.html',
  styleUrls: ['./creation-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FaIconComponent, FormsModule]
})
export class CreationMenuComponent  implements OnInit {
  @Input()friends!: UserSummary[]
  @Input()chats!: DirectChat[]
  @Output()chatEvent = new EventEmitter<Chat>()

  protected readonly onsubmit = onsubmit;
  protected readonly faCommentMedical = faCommentMedical;

  protected form!: FormGroup;
  protected filter: string = ""
  protected filteredFriends: UserSummary[] = []
  protected isGroup: boolean = false;

  constructor() { }

  ngOnInit() {
    this.filteredFriends = this.friends
  }

  filterFriends(friendId: string) {
    this.filteredFriends = this.friends.filter(
      friend => friend.userId.includes(friendId))
  }

  doesDirectChatExist(userId: string) {
    const chatExists = this.chats.find(
      (chat) =>
        chat.participants[0].userId == userId || chat.participants[1].userId == userId
    )

    if(chatExists != undefined){
      this.chatEvent.emit(chatExists)
    }else{
      this.publishDirectMessage(userId)
    }
  }

  publishDirectMessage(userId: string){

  }


  protected readonly console = console;
}
