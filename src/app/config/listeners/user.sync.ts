import {Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {User} from "../../entities/models/user";
import {Friend} from "../../entities/models/friend";
import {Profile} from "../../entities/models/profile";

@Injectable({
  providedIn: "root",
})
export class UserSync {

  constructor(private userService: UserService) {
  }

  private subs: Subscription[] = []
  private _friends: WritableSignal<Friend[]> = signal([])
  private _profile: WritableSignal<Profile> = signal({userId: '', username: '', image: ''})

  friends!: Signal<Friend[]>
  profile!: Signal<Profile>

  setFirstSignal(friends:Friend[], profile:Profile){
    this._friends.set(friends)
    this._profile.set(profile)

    this.friends = this._friends.asReadonly()
    this.profile = this._profile.asReadonly()

    this.friendListener()
    this.profileListener()
  }

  friendListener(){
    const profile = this.profile()
    this.subs.push(this.userService.friendListenerInit(profile.userId).subscribe({
      next: (event) => {
        if (event){
          this._friends.update((friends) => {
            return friends.map((friend) => {
              if(friend.friendshipId === event.friendshipId)
                return event
              else
                return friend
            })
          })
        }
      },
      error: (err) => {
        console.log(err)
      }
    }))
  }

  profileListener(){
    const profile = this.profile()
    this.subs.push(this.userService.ProfileListenerInit(profile.userId).subscribe({
      next: (event) => {
        if (event){
          this._profile.set(profile)
        }
      },
      error:(err) => {
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
