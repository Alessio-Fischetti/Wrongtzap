/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Message, Status } from 'src/app/app.component';
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
    const h = this.message.timeStamp.getHours()
    if( h >= 0 && h<=12 )
      return "AM"
    else
      return "PM"
  }
  status(){
    if(this.message.status == Status.NONE)
      return "checkmark-sharp"
    else
      return "checkmark-done-sharp"
  }
}
