import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InserirAtividadePage } from './inserir-atividade';

@NgModule({
  declarations: [
    InserirAtividadePage,
  ],
  imports: [
    IonicPageModule.forChild(InserirAtividadePage),
  ],
})
export class InserirAtividadePageModule {}
