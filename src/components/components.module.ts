import { NgModule } from '@angular/core';
import { AddActivityComponent } from './add-activity/add-activity';
import { AddMedicineComponent } from './add-medicine/add-medicine';
@NgModule({
	declarations: [AddActivityComponent,
    AddMedicineComponent],
	imports: [],
	exports: [AddActivityComponent,
    AddMedicineComponent]
})
export class ComponentsModule {}
