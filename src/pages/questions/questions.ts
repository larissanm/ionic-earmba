import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AddQuestionsPage } from '../../pages/add-questions/add-questions';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QuestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  questions: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[];
  userData = { "id_cad": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    this.storage.get('userData').then((val) => {
      this.userData.id_cad=val.id_cad;
      this.carregarListaPerguntas();
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  addQuestion(): void{
    //this.navCtrl.setRoot(AddQuestionsPage, {}, {animate: true, direction: 'forward'});
    this.navCtrl.push(AddQuestionsPage);
  }

  carregarListaPerguntas(){
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.pergunta.pesquisar + `/?id_cad=${this.userData.id_cad}`)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
        this.questions=data;
        }
        else{
          this.presentToast("Você Não possue Perguntas Cadastradas");
        }
      }, 
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
    );  
  }

  deletarPergunta(idPergunta : number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {'id_pergunta_vol': idPergunta };

    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.pergunta.inativar, JSON.stringify(data), { headers: headers })
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          this.presentToast(data);
        }
        else {
          this.presentToast("Problemas com a Exclusao");
        }
      },
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
      );

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
    });
    toast.present();
    }
}
