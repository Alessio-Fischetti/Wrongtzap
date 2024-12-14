import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IonicModule } from '@ionic/angular'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../config/auth/auth.service';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonModule, IonicModule, CardModule, FormsModule, ReactiveFormsModule, RouterModule ]
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(private authService: AuthService, private router: Router, private session: SessionService, private cd: ChangeDetectorRef) {
    this.formGroup = new FormGroup({
      userMail: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      userPassword: new FormControl("", [Validators.required, Validators.pattern(/^[\w<~`!@#$%^&*()_\-+={[}]|:;"'<,>.?\/]{8,20}$/)])
    })
   }

  ngOnInit() {
    this.formGroup.valid
  }

  loading = false

  login(){
    if(
      this.formGroup.valid &&
      this.userMail &&
      this.userPassword
      ){
        this.loading = true
        this.authService.login({
          userMail: this.userMail.value,
          userPassword: this.userPassword.value
      })
      .subscribe({
        next: (res) => {
          this.loading = false
          this.cd.detectChanges()
        },
        error: (err) => {
          console.log(err)
          this.loading = false
      },
        complete: () => {
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

  get userMail(){
    return this.formGroup.get("userMail")
  }
  get userPassword(){
    return this.formGroup.get("userPassword")
  }

}
