import { Component } from '@angular/core';

import { NavController,ToastController } from 'ionic-angular';
import { RotinaPage } from '../../pages/rotina/rotina';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddActivityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-activity',
  templateUrl: 'add-activity.html'
})
export class AddActivityComponent {
  userData = {"id_cad":""};
  text: string;
  nomeHtml : string;
  localHtml : string;
  horaInicioHtml : string;
  horaTerminoHtml : string;
  observacaoHtml : string;
  climaHtml :string;
  data :string;
  constructor(public navCtrl: NavController,private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    console.log('Hello AddActivityComponent Component');
    this.text = 'Hello World';
    storage.get('userData').then((val) => {
      this.userData.id_cad=val.id_cad;
      console.log('Value', this.userData.id_cad);
    });
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var ano = data.getFullYear();
    this.data =ano+"-"+mes+"-"+dia;
  }

  inserirRotina() : void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let data = { 'id_cad':this.userData.id_cad,'nome': this.nomeHtml, 'local': this.localHtml, 'hora_inicio': this.horaInicioHtml, 'hora_termino': this.horaTerminoHtml, 'observacao': this.observacaoHtml, 'clima': this.climaHtml,'data':this.data};    
    
    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.rotinas.inserir, JSON.stringify(data), {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => { 
              if(data!=""){
                this.presentToast(data);
               this.limparTexBox();
               this.navCtrl.setRoot(RotinaPage, {}, {animate: true, direction: 'forward'});
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
    this.localHtml ="";
    this.horaInicioHtml ="";
    this.horaTerminoHtml ="";
    this.observacaoHtml ="";
    this.climaHtml="";
    this.data="";
  }

}
