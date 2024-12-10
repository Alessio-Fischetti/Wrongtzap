import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SectionComponent} from "../../../sections/section.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSummary} from "../../../entities/summaries/user.summary";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-friends-menu',
  templateUrl: './friends-menu.component.html',
  styleUrls: ['./friends-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, SectionComponent, FontAwesomeModule, ReactiveFormsModule]
})
export class FriendsMenuComponent  implements OnInit {

  protected readonly sections = ['Online', 'Sent requests', 'Pending requests', 'Add']
  protected readonly faPaperPlane = faPaperPlane;

  @Input()userId!: string
  @Input()friends!: UserSummary[]
  protected selectedSection: string = 'Online'
  protected form: FormGroup;

  constructor(
    private userService: UserService,
  ) {
    this.form = new FormGroup({
      userId: new FormControl("", [Validators.required, Validators.pattern(/[\w\-]+/)])
    })
  }

  ngOnInit() {}

  get receiverId(){
    return this.form.get("userId");
  }

  sendRequest() {
    if (this.form.valid && this.receiverId){
      this.userService.searchUser(this.receiverId.value).then(
        (valid) => {
          if(valid){
            this.userService.addFriend({senderId: this.userId, receiverId: this.receiverId!.value})
            this.form.reset()
          }
        }
      )
    }
  }

}
