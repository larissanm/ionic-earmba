import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RotinaPage } from '../rotina/rotina';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profilePicture: any = "assets/icon/profile.png"

  constructor(public navCtrl: NavController) {

  }

  abrirTela(){
    //Vai abrir a tela desejada, onde a mesma deve ser importada, assim, vou achamar a cadastroContaPage
    this.navCtrl.setRoot(RotinaPage);
  }

}
