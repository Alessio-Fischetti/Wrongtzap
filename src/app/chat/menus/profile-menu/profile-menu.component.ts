import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonGrid} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {Defaults} from "../../../config/defaults";
import {FileUpload} from "primeng/fileupload";
import {FloatLabel} from "primeng/floatlabel";
import {AvatarModule} from "primeng/avatar";
import {SessionService} from "../../../services/session.service";
import {Card} from "primeng/card";
import {OverlayBadge} from "primeng/overlaybadge";
import {Button} from "primeng/button";
import {FileService} from "../../../services/file.service";
import {Profile} from "../../../entities/models/profile";
import {ProfileService} from "../../../services/profile.service";
import {CommonModule} from "@angular/common";
import {UploadAvatarComponent} from "../../../sections/upload-avatar/upload-avatar.component";
import {Dialog} from "primeng/dialog";
import {DynamicFieldsComponent} from "../../../sections/dynamic-fields/dynamic-fields.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    AvatarModule,
    Button,
    CommonModule,
    UploadAvatarComponent,
    Dialog,
    DynamicFieldsComponent,
    ReactiveFormsModule,
  ]
})
export class ProfileMenuComponent{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input()profile!: Profile

  constructor(
    private fileService: FileService,
    private profileService: ProfileService,
    private userService: UserService,
  ) {
  }

  updateProfile(username: string) {
    this.userService.editUsername({
      userId: this.profile.userId,
      username: username,
      description: null
    })
  }





}
