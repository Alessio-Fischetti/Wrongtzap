/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Status } from 'src/app/models/status';
import { IonChip, IonIcon } from "@ionic/angular/standalone";
import { DatePipe } from '@angular/common';
import { checkmarkSharp, checkmarkDoneSharp } from "ionicons/icons"
import { addIcons } from 'ionicons';
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [IonIcon, 
    IonChip,
    DatePipe
  ]
})
export class MessageComponent  implements OnInit {

  @Input() message!: Message

  

  constructor(public elementRef: ElementRef) {
    addIcons({checkmarkSharp, checkmarkDoneSharp})
   }

  ngOnInit() {}
  
  isPm(){
    const h = this.message.timestamp.getHours()
    if( h >= 0 && h<=12 )
      return "AM"
    else
      return "PM"
  }

  isReceived(message: Message): Boolean{
    return message.getStatus() == Status.RECEIVED 
  }
  isSeen(message: Message): Boolean{
    return message.getStatus() == Status.SEEN
  }
  status(){
    if(this.message.getStatus() == Status.NONE)
      return "checkmark-sharp"
    else
      return "checkmark-done-sharp"
  }
}
