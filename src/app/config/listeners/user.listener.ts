import {Injectable} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {User} from "../../entities/models/user";

@Injectable({
  providedIn: "root",
})
export class UserListener {

  subs: Subscription[] = []
  constructor(private userService: UserService) {

  }
  userListener(userId: string){
    this.subs.push(this.userService.userListenerInit(userId).subscribe({
      next: (event) => {
        if (event){
           //this.user = this.mapping.userConversion(event)
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }


  friendListener(user: User, userId: string){
    this.subs.push(this.userService.friendListenerInit(userId).subscribe({
      next: (event) => {
        if (event){
          user.friends.push(event)
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }


  unsubscribe() {
    if (this.subs.length > 0){
      this.subs.forEach(sub => sub.unsubscribe())
    }
  }
}
