import { Component } from '@angular/core';

import { NavController,ToastController } from 'ionic-angular';
import { MedicacaoPage } from '../../pages/medicacao/medicacao';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddMedicineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-medicine',
  templateUrl: 'add-medicine.html'
})
export class AddMedicineComponent {

  text: string;

  userData = {"id_cad":""};

  nomeHtml : string;
  dosagemHtml : string;
  miligramagemHtml : string;
  principioAtivoHtml : string;
  intervaloHtml : string;

  constructor(public navCtrl: NavController,private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    console.log('Hello AddMedicineComponent Component');
    this.text = 'Hello World';
    storage.get('userData').then((val) => {
      this.userData.id_cad=val.id_cad;
      console.log('Value', this.userData.id_cad);
    });
  }

  inserirRemedio() : void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let data = { 'id_cad':this.userData.id_cad,'nome': this.nomeHtml, 'dosagem': this.dosagemHtml, 'miligramagem': this.miligramagemHtml, 'principio_ativo': this.principioAtivoHtml, 'intervalo': this.intervaloHtml};    
    
    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.remedio.inserir, JSON.stringify(data), {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => { 
              if(data!=""){
                this.presentToast(data);
               this.limparTexBox();
               this.navCtrl.setRoot(MedicacaoPage, {}, {animate: true, direction: 'forward'});
              }
              else{
                this.presentToast("Problemas com a Inserção");
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

  limparTexBox(){
    this.userData.id_cad=null;
    this.text="";
    this.nomeHtml ="";
    this.dosagemHtml ="";
    this.intervaloHtml ="";
    this.miligramagemHtml ="";
    this.principioAtivoHtml ="";
  }

}
