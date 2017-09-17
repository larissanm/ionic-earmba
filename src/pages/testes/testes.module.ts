import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestesPage } from './testes';

@NgModule({
  declarations: [
    TestesPage,
  ],
  imports: [
    IonicPageModule.forChild(TestesPage),
  ],
})
export class TestesPageModule {}
