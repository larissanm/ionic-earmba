import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { RotinaPage } from '../rotina/rotina';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profilePicture: any = "assets/icon/profile.png"

  constructor(public navCtrl: NavController,public toastCtrl:ToastController,private storage: Storage) {
    storage.get('userData').then((val) => {
      console.log('Value', val);
    });
  }

  abrirTela(){
    //Vai abrir a tela desejada, onde a mesma deve ser importada, assim, vou achamar a cadastroContaPage
    this.navCtrl.setRoot(RotinaPage);
  }

}
