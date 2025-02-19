import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IonCol, IonRow, IonSearchbar} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  imports: [IonCol, IonRow, IonSearchbar, CommonModule, FormsModule],
  standalone: true
})
export class SearchbarComponent  implements OnDestroy {

  @Output() filterUpdated = new EventEmitter<string>()
  @Input() placeHolder: string = ''
  filter: string = ''

  ngOnDestroy() {
    this.filterUpdated.emit('')
  }

  updateFilter(friendId: any) {
      this.filterUpdated.emit(friendId)
  }

}
