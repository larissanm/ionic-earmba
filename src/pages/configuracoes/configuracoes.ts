import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';
import { SuportePage } from '../../pages/suporte/suporte';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  goToPageProfile()
  {
    this.navCtrl.push(ProfilePage);  // remember to put this to add the back button behavior
  }

  goToPageHelp(): void{
    this.navCtrl.push(SuportePage);
  }

}