import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IonicModule } from '@ionic/angular'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../config/auth/auth.service';
import {SessionService} from "../../services/session.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ButtonModule, IonicModule, CardModule, FormsModule, ReactiveFormsModule, RouterModule ]
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup
  constructor(
    private authService: AuthService,
    private router: Router,
    private session: SessionService,
    private cd: ChangeDetectorRef
  ) {
    this.formGroup = new FormGroup({
      "userName": new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      "userPassword": new FormControl("", [Validators.required, Validators.pattern(/^\w{8,20}$/)]),
      "userMail": new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
    })
   }

  ngOnInit() {}

  loading = false

  register(){
    if(this.formGroup.valid && this.userName && this.userMail && this.userPassword){
      this.loading = true
      this.authService.register({
        userName: this.userName.value,
        userMail: this.userMail!.value,
        userPassword: this.userPassword.value
      }).subscribe({
        next: (res) => {
          this.loading = false
          this.cd.detectChanges()
        },
        error: (err) => {
          console.log(err);
          this.loading = false
        },
        complete: () => {
          this.formGroup.reset()
          this.session.saveProfile().then(() => {
              this.router.navigate(["/chat"]).then(() => {
                this.session.handleSession()
              })
            }
          )
        }
      })
    }
  }

  get userName() {
    return this.formGroup.get("userName")
  }
  get userMail(){
    return this.formGroup.get("userMail")
  }
  get userPassword(){
    return this.formGroup.get("userPassword")
  }
}
