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
    this.numQuestao=1;this.pergunta="Esta é djhgADFadofADPYapçiudgfA7iyfotdytdityditdiytdiytdiytdiytditydytdiytdiytdiytditydiytdtiydtdtydiytdiytdidtyidiytdytdiytdtydtydiytdiytdytiditydytdtydtydiytdityditydtydtydiytdiytdiytdiytdtiytdytdiydiytdiytdiytdytdidtydytditydrtdcgdrrdtyvbjnlkjiytrdtersdtfgylhujxcfccfcfcfcfcfcfvggtgtgybygyg5thyghtug5th6yt5tby6tt5y6gyvybyybtH7T6HUNJBYJHYHH6YJ7UJJ8IJYHBJNBHN NTGBHBHYBGBHYVYHBHYNVJBTXJHNY7NKH8UN8UJUHI9JUNHBBYYHJUN8IJ8MMIKMKUJMFWPDQ7FWDJUQfwcQUSFCOqvwcylufÇD;XFaçydçQIUFWDqvwdcVSCLYavsçfhvQCYSXSDFQDTGTGDTTDTa primeira Pergunta";
    this.lblPergunta =this.numQuestao+" - "+this.pergunta;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestesPage');
  }

}
