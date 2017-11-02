import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TestesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testes',
  templateUrl: 'testes.html',
})

export class TestesPage {
  
  pergunta : String;
  lblPergunta : String;
  numQuestao : number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.numQuestao=1;this.pergunta="Que dia foi ontem?";
    this.lblPergunta =this.numQuestao+" - "+this.pergunta;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestesPage');
  }

}
