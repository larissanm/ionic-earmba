import { Component } from '@angular/core';

/**
 * Generated class for the TestMinimentalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test-minimental',
  templateUrl: 'test-minimental.html'
})
export class TestMinimentalComponent {

  text: string;

  constructor() {
    console.log('Hello TestMinimentalComponent Component');
    this.text = 'Hello World';
  }

}
