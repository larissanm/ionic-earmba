import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicacaoPage } from './medicacao';

@NgModule({
  declarations: [
    MedicacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicacaoPage),
  ],
})
export class MedicacaoPageModule {}
