import {enableProdMode, Injectable} from "@angular/core";
import {Profile} from "../entities/models/profile";
import {HttpClient} from "@angular/common/http";
import {environment} from "../config/environments/environment";
import {FileService} from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private fileService: FileService) {}


  async storeProfile() {

    const userId = sessionStorage.getItem("userid")

    /*if(userId) {
      const file= await this.fileService.downloadFile(userId, 'user')
      const reader = new FileReader();
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        const url = reader.result
        localStorage.setItem("userImage", url as string)
      }
    }*/
  }

  getProfile():Profile{
    const profile: Profile = {userId: '', username: '', image: ''}
    const username = sessionStorage.getItem('username');
    const userId= sessionStorage.getItem('userid');
    const image = localStorage.getItem('userImage');

    if(username)
      profile.username= username
    if(userId)
      profile.userId = userId
    if(image)
      profile.image = image

    return profile
  }
}
