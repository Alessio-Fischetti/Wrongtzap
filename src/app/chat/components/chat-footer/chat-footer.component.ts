import { Component, EventEmitter, input, Output } from '@angular/core';
import { IonFooter, IonToolbar, IonTitle, IonContent, IonInput, IonSearchbar, IonIcon, IonItem, IonButton, IonTabButton, IonPopover } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { happy, send } from 'ionicons/icons';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
  standalone: true,
  imports: [IonPopover, IonTabButton, IonButton, IonItem, IonIcon, IonSearchbar, IonInput, IonContent, IonTitle, IonToolbar, IonFooter, 
    PickerComponent, FormsModule
  ],
})
export class ChatFooterComponent {

  constructor() {
    addIcons({ happy,send })
   }

  @Output() sendMessage = new EventEmitter<string>()

  ngOnInit() {}

  inputMessage: string = ""
  addEmoji(emoji: any){
    this.inputMessage+=emoji.emoji.native
  }

  emitMessage(){
    this.sendMessage.emit(this.inputMessage)
    this.inputMessage = ""
  }
}
