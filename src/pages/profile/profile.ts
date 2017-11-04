import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ConfiguracoesPage } from '../../pages/configuracoes/configuracoes';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profilePicture: any = "assets/icon/profile.png"
  character;
  charNum : number = 0;

  public patientInformation: Array<{years: number, birth: string, sex: string, phone: number, obs:string}>;

  constructor(
    public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {

      this.patientInformation = [
        {years: 89,          birth: '0902020',          sex: 'Femino', phone: 19028327, obs:'Às vezes possui crises de comportamento.'},
      ];

    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
