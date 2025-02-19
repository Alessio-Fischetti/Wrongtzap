import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChipModule} from "primeng/chip";
import {MenuItem} from "primeng/api";
import {UserSummary} from "../../entities/models/user.summary";
import {Message} from "graphql-ws";

@Component({
  selector: 'app-chip-filter',
  templateUrl: './chip-filter.component.html',
  styleUrls: ['./chip-filter.component.scss'],
  imports: [ChipModule],
})
export class ChipFilterComponent  implements OnInit {

  constructor() { }

  @Input() item!: MenuItem
  @Input() isSelected!: boolean
  @Input() fluid?: boolean
  @Output() changeSelection = new EventEmitter<string>()

  ngOnInit() {}

  chipClicked(label: string | undefined) {
    if(label)
      this.changeSelection.emit(label);
  }
}
