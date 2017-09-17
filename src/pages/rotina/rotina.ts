import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InserirAtividadePage } from '../../pages/inserir-atividade/inserir-atividade';

/**
 * Generated class for the RotinaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotina',
  templateUrl: 'rotina.html',
})
export class RotinaPage {

  public rootPage: any;

  public atividade2: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.rootPage = InserirAtividadePage;

    this.atividade2 = "Trabalhando em como carregar o template.";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RotinaPage');
  }

  dataAtual: Date = new Date();

  public dataHoje(): string {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
}

     spplitedDate = this.dataHoje().split("/", 3);


}
