import { LABEL_CONSTANT } from 'src/app/mocks';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-component',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  /* Costante contenente le label */
  labelConstant = LABEL_CONSTANT;
  /* Costruttore della classe */
  constructor() {}

  /* Life Hook dell'onInit del componente */
  ngOnInit() {}
}
