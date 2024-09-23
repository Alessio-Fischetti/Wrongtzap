import { Component, Input, OnInit, Output } from '@angular/core';
import { IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'app-filter-chat',
  templateUrl: './filter-chat.component.html',
  styleUrls: ['./filter-chat.component.scss'],
  standalone: true,
  imports: [
    IonChip
  ]
})
export class FilterChatComponent  implements OnInit {

  @Input() label!: string
  @Input() selected!: boolean

  constructor() { }

  ngOnInit() {}

}
