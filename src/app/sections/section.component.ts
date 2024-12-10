import { Component, Input, OnInit, Output } from '@angular/core';
import { IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'app-sections',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [
    IonChip
  ]
})
export class SectionComponent implements OnInit {

  @Input() label!: string
  @Input() selected!: boolean

  constructor() { }

  ngOnInit() {}

}
