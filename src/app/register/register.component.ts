import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IonicModule } from '@ionic/angular'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ButtonModule, IonicModule, CardModule, FormsModule, ReactiveFormsModule, RouterModule ]
})
export class RegisterComponent  implements OnInit {

  formGroup: FormGroup
  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      "userName": new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      "userMail": new FormControl("", [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,}$/)]),
      "userPassword": new FormControl("", [Validators.required, Validators.pattern(/^[\w<~`!@#$%^&*()_\-+={[}]|:;"'<,>.?\/]{8,20}$/)])
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
          console.log(res)
        },
        error: (err) => {
          console.log(err);
          this.loading = false
        },
        complete: () => {
          this.loading = false
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
