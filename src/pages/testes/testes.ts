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

  perguntasStc: { 'id_pergunta_stc': "", 'pergunta_stc': "", 'tipo_stc': "" }[];
  perguntaPesTF: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[];
  perguntaPesTP: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[];
  questionsVol: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[];
  perguntasPes:{ 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[];

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
  PEStipo: string;

  PESimg:string;

  PESnumQuestion: number;
  PESnumOfQuestions: number;

  FOTnumOfPoints: number;
  PESnumOfPoints: number;
  isenabled: boolean = false;

  clima: string = "ensolarado";
  data: string;

  isMiniMentalComplete: boolean;
  isPessoalComplete:boolean;
  constructor(private toastCtrl: ToastController, private http: Http, private storage: Storage) {
    this.MNnumQuestion = 1;
    this.PESnumQuestion = 1;
    this.MNnumOfPoints = 0;
    this.PESnumOfPoints = 0;
    this.FOTnumOfPoints = 0;
    this.perguntaPesTF = new Array();
    this.perguntaPesTP = new Array();
    this.perguntasPes =new Array();
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    this.data = ano + "-" + mes + "-" + dia;
    storage.get('userData').then((val) => {
      this.userData.id_cad = val.id_cad;
      console.log('Value', this.userData.id_cad);
      this.insertNotaDiaria(); this.takeDataPessoal();
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
          this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
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

  takeDataPessoal() {
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.pergunta.pesquisar + `/?id_cad=${this.userData.id_cad}`)
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          this.questionsVol = data;
          this.splitPessoalQuestions();
        }
        else {
          this.presentToast("Você Não possue Perguntas Cadastradas");
        }
      },
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
      );
  }

  splitPessoalQuestions() {
    for (let l: number = 0; l < this.questionsVol.length; l++) {
      if (this.questionsVol[l].img == null) {
        this.perguntaPesTP.push(this.questionsVol[l]);
      }
      else {
        this.perguntaPesTF.push(this.questionsVol[l]);
      }
    }
    console.log(this.perguntaPesTP);
    console.log("_____________________________________________");
    console.log(this.perguntaPesTF);
    this.randomizePessoalQuestions();
  }

  randomizePessoalQuestions() {
    let questionsPes: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[] = new Array();
    let questionsFT: { 'id_pergunta_vol': "", 'id_cad': "", 'pergunta_vol': "", 'resposta_vol': "", 'img': "" }[] = new Array();
    let numQuestions: number = 0;
    for (let i: number = 0; numQuestions < this.perguntaPesTF.length; i--) {
      let numRandom: number = Math.random();
      numRandom *= 10;
      let numCeil: number = Math.ceil(numRandom) - 1;
      if (numCeil < 0) { }
      else {
        if (this.perguntaPesTF.length == 1) {
          questionsFT.push(this.perguntaPesTF[0]);
          this.perguntaPesTF.splice(0, 1);
        }
        else if (numCeil < this.perguntaPesTF.length) {
          questionsFT.push(this.perguntaPesTF[numCeil]);
          this.perguntaPesTF.splice(numCeil, 1);
        }
      }
    }
    for (let i: number = 0; numQuestions < this.perguntaPesTP.length; i--) {
      let numRandom: number = Math.random();
      numRandom *= 10;
      let numCeil: number = Math.ceil(numRandom) - 1;
      if (numCeil < 0) { }
      else {
        if (this.perguntaPesTP.length == 1) {
          questionsPes.push(this.perguntaPesTP[0]);
          this.perguntaPesTP.splice(0, 1);
        }
        else if (numCeil < this.perguntaPesTP.length) {
          questionsPes.push(this.perguntaPesTP[numCeil]);
          this.perguntaPesTP.splice(numCeil, 1);
        }
      }
    } this.perguntaPesTF = questionsFT;
    this.perguntaPesTP = questionsPes;
    this.removeQuestionToSix()
  }

  removeQuestionToSix() {
    let qtdeRemovePes: number = this.perguntaPesTP.length - 6;
    let qtdeRemoveTf: number = this.perguntaPesTF.length - 6;

    this.perguntaPesTP.splice(this.perguntaPesTP.length - 1 - qtdeRemovePes, qtdeRemovePes);
    this.perguntaPesTF.splice(this.perguntaPesTF.length - 1 - qtdeRemoveTf, qtdeRemoveTf);

    this.unitQuestionsPes();
  }

  unitQuestionsPes() {
    
    let numQuestions: number = 12;
    let numQuestionsTP: number = 0;
    let numQuestioTF: number = 0;
    for (let l: number = 0; l < numQuestions; l++) {
      if (l % 2 == 0) {
        this.perguntasPes.push(this.perguntaPesTF[numQuestioTF]);
        numQuestioTF++;
      } else {
        this.perguntasPes.push(this.perguntaPesTP[numQuestionsTP]);
        numQuestionsTP++;
      }
    }
    console.log(this.perguntasPes);
    this.intitPes();
  }

  intitPes(){
    this.PESnumOfQuestions=this.perguntasPes.length;
    this.PESnumQuestion=1;
    this.PESlblAnswer=this.perguntasPes[this.PESnumQuestion-1].resposta_vol;
    this.PESimg=this.perguntasPes[this.PESnumQuestion-1].img;
    this.PESlblQuestion=this.perguntasPes[this.PESnumQuestion-1].pergunta_vol;
    
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
          this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
    }
    else if (PES == true) {
      console.log("PERS");
      if (this.isPessoalComplete == true) {
        this.presentToast("Todas as perguntas do Teste Pessoal ja foram respondidas");
        console.log(this.PESnumOfPoints);
      } else {
        this.responderPessoal(1);
        if(this.perguntasPes[this.PESnumQuestion-1].img !=null){
          this.FOTnumOfPoints+=5;
        }
        else{
          this.PESnumOfPoints+=5;
        }
        if (this.PESnumQuestion == this.PESnumOfQuestions) {
          this.pesComplete();
        }
        else {
          this.PESnumQuestion = this.PESnumQuestion + 1;
          this.PESlblAnswer=this.perguntasPes[this.PESnumQuestion-1].resposta_vol;
          this.PESimg=this.perguntasPes[this.PESnumQuestion-1].img;
          this.PESlblQuestion=this.perguntasPes[this.PESnumQuestion-1].pergunta_vol;
          //this.PESsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
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
          this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
    }
    else if (PES == true) {
      console.log("PERS");
      if (this.isPessoalComplete == true) {
        this.presentToast("Todas as perguntas do Teste Pessoal ja foram respondidas");
        console.log(this.PESnumOfPoints);
      } else {
        this.responderPessoal(0);
        this.PESnumOfPoints+=5;
        if (this.PESnumQuestion == this.PESnumOfQuestions) {
          this.pesComplete();
        }
        else {
          this.PESnumQuestion = this.PESnumQuestion + 1;
          this.PESlblAnswer=this.perguntasPes[this.PESnumQuestion-1].resposta_vol;
          this.PESimg=this.perguntasPes[this.PESnumQuestion-1].img;
          this.PESlblQuestion=this.perguntasPes[this.PESnumQuestion-1].pergunta_vol;
          //this.PESsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
    }
  }

  mnComplete() {
    this.isMiniMentalComplete = true;
    this.MNsubject = "Completo";
    this.MNquestion = "O Minimental Foi Completo";
    this.insertNotaDiaria();
  }
  pesComplete() {
    this.isPessoalComplete = true;
    this.PEStipo = "Completo";
    this.PESlblQuestion = "O Teste Pessoal Foi Completo";
    this.PESlblAnswer="";
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

  responderPessoal(resposta:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.perguntasPes[0]);
    console.log(this.perguntasPes[0].id_pergunta_vol);
  
    let data2 = { 'id_cad': this.userData.id_cad ,'resposta': resposta, 'id_pergunta_vol': this.perguntasPes[this.PESnumQuestion - 1].id_pergunta_vol,'observacao': null, 'data': this.data, 'clima': this.clima };
    console.log(data2);
    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.responderPessoal, JSON.stringify(data2), { headers: headers })
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

  insertNotaDiaria() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = { 'id_cad': this.userData.id_cad, 'resultadommes': this.MNnumOfPoints, 'resultadotp': this.PESnumOfPoints, 'resultadotf': this.FOTnumOfPoints, 'data': this.data };

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
