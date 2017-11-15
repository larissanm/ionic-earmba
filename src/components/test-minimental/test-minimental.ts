import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TestMinimentalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test-minimental',
  templateUrl: 'test-minimental.html'
})
export class TestMinimentalComponent {

  userData = {"id_cad":""};

  perguntasStc :{'id_pergunta_stc':"",'pergunta_stc':""}[];

  text: string;
  question : String;
  lblQuestion : String;
  lblAnswer : String; 
  numQuestion : number;
  numOfQuestions : number;
  isenabled : boolean=false;

  constructor(private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    console.log('Hello TestMinimentalComponent Component');
    this.text = 'Hello World';

    this.takeDataMiniMental();

  this.numQuestion=1;
  
  }

  //Armazena os dados de UserData
  carregaUserdata(){
    this.storage.get('userData').then((val) => {
      this.userData.id_cad=val.id_cad;
      console.log('aa', this.userData);
    });
  }

  takeDataMiniMental(){
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.teste.pesquisarMiniMental)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
        this.perguntasStc=data;
        this.numOfQuestions=this.perguntasStc.length;
        this.question=this.perguntasStc[this.numQuestion-1].pergunta_stc;
        console.log(this.perguntasStc);
        }
        else{
          this.presentToast("ERRO Na Busca Das Perguntas");
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

    /**
     * acertouPergunta
     */
    public acertouResposta() {
      console.log("acertou");
      this.numQuestion=this.numQuestion+1;
      this.question=this.perguntasStc[this.numQuestion-1].pergunta_stc;
    }

}
