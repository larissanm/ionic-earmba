import { Component } from '@angular/core';

/**
 * Generated class for the AddMedicineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-medicine',
  templateUrl: 'add-medicine.html'
})
export class AddMedicineComponent {

  text: string;

  constructor() {
    console.log('Hello AddMedicineComponent Component');
    this.text = 'Hello World';
  }

}
