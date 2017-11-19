import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
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

  userData = { "id_cad": "" };

  perguntasStc: { 'id_pergunta_stc': "", 'pergunta_stc': "" ,'tipo_stc':""}[];

  MNpergunta: String;
  MNquestion: String;
  MNlblQuestion: String;
  MNsubject: string;
  //lblAnswer : String; 
  MNnumQuestion: number;
  MNnumOfQuestions: number;
  MNnumOfPoints: number;
  //isenabled : boolean=false;

  pergunta: String;
  PESquestion: String;
  PESlblQuestion: String;
  PESlblAnswer: String;
  
  PESnumQuestion: number;
  PESnumOfQuestions: number;

  FOTnumOfPoints: number;
  PESnumOfPoints: number;
  isenabled: boolean = false;

  clima: string = "ensolarado";
  data: string;

  isMiniMentalComplete: boolean;

  constructor(private toastCtrl: ToastController, private http: Http, private storage: Storage) {
    this.MNnumQuestion = 1;
    this.MNnumOfPoints=0;
    this.PESnumOfPoints=0;
    this.FOTnumOfPoints=0;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    this.data = ano + "-" + mes + "-" + dia;
    storage.get('userData').then((val) => {
      this.userData.id_cad=val.id_cad;
      console.log('Value', this.userData.id_cad);
      this.insertNotaDiaria();
    });
    this.isMiniMentalComplete = false;
    this.takeDataMiniMental();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestesPage');
  }

  takeDataMiniMental() {
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.pesquisarMiniMental)
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          this.perguntasStc = data;
          this.MNnumOfQuestions = this.perguntasStc.length;
          this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
          this.MNsubject= this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
          console.log(this.perguntasStc);
        }
        else {
          this.presentToast("ERRO Na Busca Das Perguntas");
        }
      },
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
      );

  }



  acertouResposta(MN: boolean, PES: boolean) {
    if (MN == true) {
      console.log("MN");
      if (this.isMiniMentalComplete == true) {
        this.presentToast("Todas as perguntas do Minimental ja foram respondidas");
        console.log(this.MNnumOfPoints);
      } else {
        this.responderMiniMental(1);
        this.MNnumOfPoints++;
        if (this.MNnumQuestion == this.MNnumOfQuestions) {
          this.mnComplete();
        }
        else {
          this.MNnumQuestion = this.MNnumQuestion + 1;
          this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
          this.MNsubject= this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
    }
    else if (PES == true) {
      console.log("PERS");
    }
  }

  errouResposta(MN: boolean, PES: boolean) {
    if (MN == true) {
      console.log("MN");
      if (this.isMiniMentalComplete == true) {
        this.presentToast("Todas as perguntas do Minimental ja foram respondidas");
      } else {
        this.responderMiniMental(0);
        if (this.MNnumQuestion == this.MNnumOfQuestions) {
         this.mnComplete();
        }
        else {
          this.MNnumQuestion = this.MNnumQuestion + 1;
          this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
          this.MNsubject= this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
    }
    else if (PES == true) {
      console.log("PERS");
    }
  }

  mnComplete(){
    this.isMiniMentalComplete = true;
    this.MNsubject="Completo";
    this.MNquestion="O Minimental Foi Completo";
    this.insertNotaDiaria();
  }

  responderMiniMental(resposta: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = { 'id_cad': this.userData.id_cad, 'id_pergunta_stc': this.perguntasStc[this.MNnumQuestion - 1].id_pergunta_stc, 'resposta': resposta, 'observacao': null, 'data': this.data, 'clima': this.clima };

    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.responderMiniMental, JSON.stringify(data), { headers: headers })
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          //this.presentToast(data);
        }
        else {
          this.presentToast("Problemas com a Inserção");
        }
      },
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
      );
  }

  insertNotaDiaria(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = { 'id_cad': this.userData.id_cad, 'resultadommes': this.MNnumOfPoints, 'resultadotp':this.PESnumOfPoints ,'resultadotf':this.FOTnumOfPoints,'data': this.data };

    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.insertNotaDiaria, JSON.stringify(data), { headers: headers })
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          this.presentToast(data);
        }
        else {
          this.presentToast("Problemas com a Inserção das notas no servidor");
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
