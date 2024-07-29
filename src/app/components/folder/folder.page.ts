import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private userService: UserService) {}

  result: any

  jsonResult(){
    return JSON.stringify(this.result)
  }

  async ngOnInit() {
    this.loading = true
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    await this.getUser('1')
    this.loading = false
  }

  loading = false
  async getUser(id: string){
    this.loading = true
    this.result = await this.getUserById(id)
    this.loading = false
  }

  getUserById(id: string){
    return new Promise<any>(resolve => {
      this.userService.getUserById(id).subscribe({
        next: (result) => {
          resolve(result)
        },
        error: (err) => {
          console.log(err);
          resolve(undefined)          
        },
        complete: () => {}
      })
      })
  }
}
