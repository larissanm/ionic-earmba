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
  perguntaPesTF: Question[];
  perguntaPesTP: Question[];
  questionsVol: Question[];
  perguntasPes: Question[];

  testeData: { data?: string, isMiniMentalStarted?: boolean, isPessoalStarted?: boolean, isMiniMentalComplete?: boolean, isPessoalComplete?: boolean, MNnumQuestion?: number, PESnumQuestion?: number, FOTnumOfPoints?:number, PESnumOfPoints?:number, MNnumOfPoints?:number };

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

  PESimg: string;

  PESnumQuestion: number;
  PESnumOfQuestions: number;

  FOTnumOfPoints: number;
  PESnumOfPoints: number;
  isenabled: boolean = false;

  clima: string = "ensolarado";
  data1: string;

  isMiniMentalComplete: boolean;
  isPessoalComplete: boolean;

  isMiniMentalStarted: boolean;
  isPessoalStarted: boolean;
  constructor(private toastCtrl: ToastController, private http: Http, private storage: Storage) {
    this.MNnumQuestion = 1;
    this.PESnumQuestion = 1;
    this.MNnumOfPoints = 0;
    this.PESnumOfPoints = 0;
    this.FOTnumOfPoints = 0;
    this.perguntaPesTF = new Array();
    this.perguntaPesTP = new Array();
    this.perguntasPes = new Array();
    this.testeData={ 'data': "", 'isMiniMentalStarted': false, 'isPessoalStarted': false, 'isMiniMentalComplete': false, 'isPessoalComplete': false, 'MNnumQuestion': 1, 'PESnumQuestion': 1 ,'FOTnumOfPoints':0,'PESnumOfPoints':0,'MNnumOfPoints':0};   
    this.isMiniMentalComplete = false;
    this.isMiniMentalStarted = false;
    this.isPessoalComplete = false;
    this.isPessoalStarted = false;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    this.data1 = ano + "-" + mes + "-" + dia;
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.pesquisarMiniMental)
    .map(res => res.json())
    .subscribe(
    data => {
      if (data != "") {
        this.perguntasStc = data;
        this.MNnumOfQuestions = this.perguntasStc.length;
        this.init();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestesPage');
  }

  init(){
   
    this.storage.get('userData').then((val) => { 
      this.userData.id_cad = val.id_cad;
      console.log('Value', this.userData.id_cad);
    });
    this.storage.get('testeData').then((val) => {
     
    
      console.log(val);
     if(val!=null){
      this.testeData=val;
      console.log(this.testeData);
      if (val!=null && this.testeData.data == this.data1) {
        this.isMiniMentalComplete = this.testeData.isMiniMentalComplete;
        this.isMiniMentalStarted = this.testeData.isMiniMentalStarted;
        this.isPessoalComplete = this.testeData.isPessoalComplete;
        this.isPessoalStarted = this.testeData.isPessoalStarted;
        this.MNnumQuestion = this.testeData.MNnumQuestion;
        this.PESnumQuestion = this.testeData.PESnumQuestion;
        this.FOTnumOfPoints=this.testeData.FOTnumOfPoints;
        this.PESnumOfPoints=this.testeData.PESnumOfPoints;
        this.MNnumOfPoints=this.testeData.MNnumOfPoints;
        if (this.testeData.isMiniMentalStarted == true) {
          if (this.testeData.isMiniMentalComplete == true) {
            console.log('ac');
            this.mnComplete(0);
          }
          else {
            this.initMn(this.testeData.MNnumQuestion);
          }
        }
        if (this.testeData.isPessoalStarted == true) {
          if (this.testeData.isPessoalComplete == true) {
            this.pesComplete(0);
          }
          else {
            console.log('aa');
            this.storage.get('questionPesData').then((val) => {
              console.log(val);
              if (val[0].data == this.data1) {
                console.log(val.data);
                this.perguntasPes = val;
                this.initPes(this.testeData.PESnumQuestion);
              }
              else {
                this.takeDataPessoal();
              }
            });
          }
        }
        else{
          this.takeDataPessoal();
        }
      } 
      else {
        this.takeDataPessoal();
        this.initMn(1);
        console.log('demi');
      }
    }
  
      else {
        this.takeDataPessoal();
        this.initMn(1);
        console.log('demi');
      }

    });
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
    let questionsPes: Question[] = new Array();
    let questionsFT: Question[] = new Array();
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
    this.perguntasPes[0].data = this.data1;
    console.log(this.perguntasPes);
    this.storage.set('questionPesData',this.perguntasPes);
    this.initPes(1);
  }

  initPes(starterNumQuestion: number) {
    this.PESnumOfQuestions = this.perguntasPes.length;
    this.PESnumQuestion = starterNumQuestion;
    this.PESlblAnswer = this.perguntasPes[this.PESnumQuestion - 1].resposta_vol;
    this.PESimg = this.perguntasPes[this.PESnumQuestion - 1].img;
    this.PESlblQuestion = this.perguntasPes[this.PESnumQuestion - 1].pergunta_vol;
  }

  initMn(starterNumQuestion: number) {
    this.MNnumQuestion = starterNumQuestion;
    this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
    this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
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
          this.mnComplete(1);
        }
        else {
          this.MNnumQuestion = this.MNnumQuestion + 1;
          this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
          this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
        this.isMiniMentalStarted=true;
        this.attTesteData();
      }
    }
    else if (PES == true) {
      console.log("PERS");
      if (this.isPessoalComplete == true) {
        this.presentToast("Todas as perguntas do Teste Pessoal ja foram respondidas");
        console.log(this.PESnumOfPoints);
      } else {
        this.responderPessoal(1);
        if (this.perguntasPes[this.PESnumQuestion - 1].img != null) {
          this.FOTnumOfPoints += 5;
        }
        else {
          this.PESnumOfPoints += 5;
        }
        if (this.PESnumQuestion == this.PESnumOfQuestions) {
          this.pesComplete(1);
        }
        else {
          this.PESnumQuestion = this.PESnumQuestion + 1;
          this.PESlblAnswer = this.perguntasPes[this.PESnumQuestion - 1].resposta_vol;
          this.PESimg = this.perguntasPes[this.PESnumQuestion - 1].img;
          this.PESlblQuestion = this.perguntasPes[this.PESnumQuestion - 1].pergunta_vol;
          //this.PESsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
        this.isPessoalStarted=true;
        this.attTesteData();
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
          this.mnComplete(1);
        }
        else {
          this.MNnumQuestion = this.MNnumQuestion + 1;
          this.MNquestion = this.perguntasStc[this.MNnumQuestion - 1].pergunta_stc;
          this.MNsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
        this.isMiniMentalStarted=true;
        this.attTesteData();
      }
    }
    else if (PES == true) {
      console.log("PERS");
      if (this.isPessoalComplete == true) {
        this.presentToast("Todas as perguntas do Teste Pessoal ja foram respondidas");
        console.log(this.PESnumOfPoints);
      } else {
        this.responderPessoal(0);
        //this.PESnumOfPoints += 5;
        if (this.PESnumQuestion == this.PESnumOfQuestions) {
          this.pesComplete(1);
        }
        else {
          this.PESnumQuestion = this.PESnumQuestion + 1;
          this.PESlblAnswer = this.perguntasPes[this.PESnumQuestion - 1].resposta_vol;
          this.PESimg = this.perguntasPes[this.PESnumQuestion - 1].img;
          this.PESlblQuestion = this.perguntasPes[this.PESnumQuestion - 1].pergunta_vol;
          //this.PESsubject = this.perguntasStc[this.MNnumQuestion - 1].tipo_stc;
        }
      }
      this.isPessoalStarted=true;
      this.attTesteData();
    }
  }

  mnComplete(type: number) {
    console.log('ad');
    this.isMiniMentalComplete = true;
    this.MNsubject = "Completo";
    this.MNquestion = "O Minimental Foi Completo";
    if (type == 0) {

    }
    else {
      this.insertNotaDiaria();
    }
  }
  pesComplete(type: number) {
    this.isPessoalComplete = true;
    this.PEStipo = "Completo";
    this.PESlblQuestion = "O Teste Pessoal Foi Completo";
    this.PESlblAnswer = "";
    if (type == 0) {

    }
    else {
      this.insertNotaDiaria();
    }
  }

  attTesteData() {
    this.testeData = {};
    this.testeData.data = this.data1;
    this.testeData.isMiniMentalComplete = this.isMiniMentalComplete;
    this.testeData.isMiniMentalStarted = this.isMiniMentalStarted;
    this.testeData.isPessoalComplete = this.isPessoalComplete;
    this.testeData.isPessoalStarted = this.isPessoalStarted;
    this.testeData.MNnumQuestion = this.MNnumQuestion;
    this.testeData.PESnumQuestion = this.PESnumQuestion;
    this.testeData.FOTnumOfPoints=this.FOTnumOfPoints;
    this.testeData.PESnumOfPoints=this.PESnumOfPoints;
    this.testeData.MNnumOfPoints=this.MNnumOfPoints;
    this.storage.set('testeData',this.testeData);
  }

  responderMiniMental(resposta: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = { 'id_cad': this.userData.id_cad, 'id_pergunta_stc': this.perguntasStc[this.MNnumQuestion - 1].id_pergunta_stc, 'resposta': resposta, 'observacao': null, 'data': this.data1, 'clima': this.clima };

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

  responderPessoal(resposta: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.perguntasPes[0]);
    console.log(this.perguntasPes[0].id_pergunta_vol);

    let data2 = { 'id_cad': this.userData.id_cad, 'resposta': resposta, 'id_pergunta_vol': this.perguntasPes[this.PESnumQuestion - 1].id_pergunta_vol, 'observacao': null, 'data': this.data1, 'clima': this.clima };
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

    let data = { 'id_cad': this.userData.id_cad, 'resultadommes': this.MNnumOfPoints, 'resultadotp': this.PESnumOfPoints, 'resultadotf': this.FOTnumOfPoints, 'data': this.data1 };

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

interface Question {
  id_pergunta_vol: string;
  id_cad: string;
  pergunta_vol: string;
  resposta_vol: string;
  img: string;
  data?: string;
}


interface TesteData {
  id_pergunta_vol: string;
  id_cad: string;
  pergunta_vol: string;
  resposta_vol: string;
  img: string;
  data?: string;
}