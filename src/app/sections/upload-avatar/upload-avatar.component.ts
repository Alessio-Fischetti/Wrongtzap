import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Defaults} from "../../config/defaults";
import {FileService} from "../../services/file.service";
import {SessionService} from "../../services/session.service";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../entities/models/profile";
import {IonicModule} from "@ionic/angular";
import {IonAvatar, IonCol, IonRow} from "@ionic/angular/standalone";

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
  imports: [IonAvatar, IonCol, IonRow],
  standalone: true
})
export class UploadAvatarComponent  implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input()mode!: string

  protected readonly Defaults = Defaults;
  protected profile!: Profile;
  protected image!: string

  constructor(private fileService: FileService, private profileService: ProfileService) {}

  ngOnInit() {
    switch (this.mode){
      case 'user':{
        this.profile = this.profileService.getProfile();
        this.image = this.profile.image
        break;
      }
      default:{
        this.profile = this.profileService.getProfile();
        this.image = this.profile.image
      }
    }
  }

  startUpload(){
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0)
      switch (this.mode){
      case 'user':{
        this.fileService.uploadFile(input.files[0], this.profile.userId, "user")
        break;
      }
      default:{
        this.fileService.uploadFile(input.files[0], this.profile.userId, "user")
      }
    }
  }

}
