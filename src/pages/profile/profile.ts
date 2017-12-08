import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ConfiguracoesPage } from '../../pages/configuracoes/configuracoes';
import { HomePage } from '../../pages/home/home';

import { Storage } from '@ionic/storage';

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

  htmlNome : string;
  htmlNivelDoenca : number;
  htmlIdade : number;
  htmlNasc : string;
  htmlSexo : string;
  htmlTelefone : string;


  public patientInformation: Array<{years: number, birth: string, sex: string, phone: number, obs:string}>;

  constructor(
    public platform: Platform, public params: NavParams, public viewCtrl: ViewController,private storage: Storage) {

      this.patientInformation = [
        {years: 89,          birth: '0902020',          sex: 'Femino', phone: 19028327, obs:'Às vezes possui crises de comportamento.'},
      ];

      storage.get('userData').then((val) => {
        console.log('Value', val);
        this.htmlNome=val.nome;
        this.htmlNivelDoenca=val.nivel_doenca;
        this.htmlSexo=val.sexo;
        this.htmlTelefone=val.telefone;

        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth()+1;
        var ano = data.getFullYear();

        let dataNasc : string =val.datanasc;
        let splitDataNasc = dataNasc.split("-");

        let idade : number = ano-parseInt(splitDataNasc[0]); 

        if(mes<parseInt(splitDataNasc[1])){
          idade--;
        }
        else if(mes==parseInt(splitDataNasc[1])){
          if(dia<parseInt(splitDataNasc[2])){
            idade--;
          }
        }
        this.htmlIdade=idade;
        this.htmlNasc=splitDataNasc[2]+"/"+splitDataNasc[1]+"/"+splitDataNasc[0];
      });
    

    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
