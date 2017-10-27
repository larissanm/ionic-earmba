import { NgModule } from '@angular/core';
import { AddActivityComponent } from './add-activity/add-activity';
import { AddMedicineComponent } from './add-medicine/add-medicine';
import { TestMinimentalComponent } from './test-minimental/test-minimental';
import { TestPersonalComponent } from './test-personal/test-personal';
import { EditActivityComponent } from './edit-activity/edit-activity';
@NgModule({
	declarations: [AddActivityComponent,
    AddMedicineComponent,
    TestMinimentalComponent,
    TestPersonalComponent,
    EditActivityComponent],
	imports: [],
	exports: [AddActivityComponent,
    AddMedicineComponent,
    TestMinimentalComponent,
    TestPersonalComponent,
    EditActivityComponent]
})
export class ComponentsModule {}
