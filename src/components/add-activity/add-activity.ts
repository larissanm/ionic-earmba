import { Component } from '@angular/core';

/**
 * Generated class for the AddActivityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-activity',
  templateUrl: 'add-activity.html'
})
export class AddActivityComponent {

  text: string;

  constructor() {
    console.log('Hello AddActivityComponent Component');
    this.text = 'Hello World';
  }

}
