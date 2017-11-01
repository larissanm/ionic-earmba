import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MedicacaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicacao',
  templateUrl: 'medicacao.html',
})
export class MedicacaoPage {

  remedios : { 'id_cad':"",'nome':"", 'dosagem':"", 'miligramagem': "", 'principio_ativo': "", 'intervalo': "", 'id_remedio': ""}[];    
  
  userData = {"id_cad":""};

  userDataCarregado :boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    this.carregaUserdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicacaoPage');
  }

  isListReady(){var a =5;
    while(a>=1){
      console.log("forFunciona");
      if(this.userDataCarregado==true){
        a=0;this.carregarList();
      }
      else{
        a++;
      }
    }
  }

  deletarRemedio(idRemdio : any){
    let headers = new Headers();
    console.log(idRemdio)+"idRemdio";
    headers.append('Content-Type', 'application/json');
    this.http.delete(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.remedio.deletar + `/?id_remedio=${idRemdio}`)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
          this.presentToast(data);
         this.navCtrl.setRoot(MedicacaoPage, {}, {animate: true, direction: 'forward'});
        }
        else{
          this.presentToast("Problemas com a Exclusão");
        }
      }, 
      err => {
        console.log("rej" + err);
        this.presentToast(err);
      }
    );  
    
  }


  carregarList(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.userDataCarregado);
    this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.remedio.pesquisar + `/?id_cad=${this.userData.id_cad}`)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
        this.remedios=data;
        }
        else{
          this.presentToast("Você Não possue Medicamentos Cadastrados");
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
//Armazena os dados de UserData
carregaUserdata(){
this.storage.get('userData').then((val) => {
  this.userData.id_cad=val.id_cad;
  console.log('aa', this.userData);
  this.userDataCarregado=true;
  this.isListReady();
});
}

}
