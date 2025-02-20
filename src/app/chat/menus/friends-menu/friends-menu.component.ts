import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSummary} from "../../../entities/models/user.summary";
import {UserService} from "../../../services/user.service";
import {ChipFilterComponent} from "../../../sections/chip-filter/chip-filter.component";
import {MenuItem} from "primeng/api";
import {Button} from "primeng/button";
import {Friend} from "../../../entities/models/friend";
import {UserSync} from "../../../config/listeners/user.sync";

@Component({
    selector: 'app-friends-menu',
    templateUrl: './friends-menu.component.html',
    styleUrls: ['./friends-menu.component.scss'],
  imports: [IonicModule, FontAwesomeModule, ReactiveFormsModule, ChipFilterComponent, Button]
})
export class FriendsMenuComponent {

  protected readonly sections = ['Online', 'Sent requests', 'Pending requests', 'Add']
  protected readonly faPaperPlane = faPaperPlane;

  protected section: MenuItem[] = [
    {
      label: 'Online',
      icon: 'pi pi-wave-pulse'
    },
    {
      label: 'Pending',
      icon: 'pi pi-hourglass'
    },
    {
      label: 'Add',
      icon: 'pi pi-user-plus'
    }
  ]

  protected selectedSection: string = 'Online'
  protected form: FormGroup;

  constructor(
    private userService: UserService,
    readonly userSync: UserSync
  ) {
    this.form = new FormGroup({
      userId: new FormControl("", [Validators.required, Validators.pattern(/[\w\-]+/)])
    })
  }

  get receiverId(){
    return this.form.get("userId");
  }

  sendRequest() {
    const profile = this.userSync.profile()
    if (this.form.valid && this.receiverId){
      this.userService.searchUser(this.receiverId.value).then(
        (valid) => {
          if(valid){
            this.userService.addFriend({senderId: profile.userId, receiverId: this.receiverId!.value})
            this.form.reset()
          }
        }
      )
    }
  }

  selectSection(section: string | undefined){
    if(section)
      this.selectedSection = section;
  }

}
