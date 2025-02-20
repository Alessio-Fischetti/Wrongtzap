import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, input,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {IonCol, IonGrid, IonInput, IonRow} from "@ionic/angular/standalone";
import {Button} from "primeng/button";
import {toggle} from "ionicons/icons";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {FloatLabel} from "primeng/floatlabel";
import {OverlayBadge} from "primeng/overlaybadge";
import {Badge, BadgeDirective} from "primeng/badge";
import {Card} from "primeng/card";
import {UserSync} from "../../config/listeners/user.sync";
import {ChatSync} from "../../config/listeners/chat.sync";

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss'],
  imports: [IonRow, IonCol, Button, FormsModule, IonInput]
})
export class DynamicFieldsComponent {

  @Input()label: string = "Please Enter"
  @Input()minLength: number = 1;
  @Input()maxLength: number = 20;
  @Input()mode: string = ''
  @Input()default: string = ""

  @Output() outputSent = new EventEmitter<string>();
  editMode: boolean = false;


  sendOutput(){
    if(this.default.length >= this.minLength) {
      this.outputSent.emit(this.default);
      this.editMode = false;
    }
  }

  detectKey(event: KeyboardEvent) {
    if(event.key === 'Enter'){
      this.sendOutput();
    }
    else if( event.key === 'Escape'){
      this.editMode = false;
    }
  }
}
