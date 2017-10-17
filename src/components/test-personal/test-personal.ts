import { Component } from '@angular/core';

/**
 * Generated class for the TestPersonalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test-personal',
  templateUrl: 'test-personal.html'
})
export class TestPersonalComponent {

  text: string;

  constructor() {
    console.log('Hello TestPersonalComponent Component');
    this.text = 'Hello World';
  }

}
