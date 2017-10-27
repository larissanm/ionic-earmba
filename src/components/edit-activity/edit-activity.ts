import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { RotinaPage } from '../../pages/rotina/rotina';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditActivityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-activity',
  templateUrl: 'edit-activity.html'
})
export class EditActivityComponent {

  text: string;
  idRotina : string;
  nomeHtml : string;
  localHtml : string;
  horaInicioHtml : string;
  horaTerminoHtml : string;
  observacaoHtml : string;
  climaHtml :string;

  constructor(public navCtrl: NavController,private toastCtrl :ToastController,private http:Http,private storage: Storage) {
    console.log('Hello EditActivityComponent Component');
    this.text = 'Hello World';
    storage.get('rotina').then((val) => {
      this.idRotina=val.id_atividade;
      this.nomeHtml=val.nome;
      this.localHtml=val.local;
      this.horaInicioHtml=val.hora_inicio;
      this.horaTerminoHtml=val.hora_termino;
      this.observacaoHtml=val.observacao;
      this.climaHtml=val.clima;

      console.log(this.idRotina);
    });
  }

  deletarRotina(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.delete(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.rotinas.deletar + `/?id_atividade=${this.idRotina}`)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
          this.presentToast(data);
         this.limparTexBox();
         this.navCtrl.setRoot(RotinaPage, {}, {animate: true, direction: 'forward'});
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

  alterarRotina(){
    let data = { 'id_atividade':this.idRotina,'nome': this.nomeHtml, 'local': this.localHtml, 'hora_inicio': this.horaInicioHtml, 'hora_termino': this.horaTerminoHtml, 'observacao': this.observacaoHtml, 'clima': this.climaHtml};    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.rotinas.atualizar, JSON.stringify(data), {headers: headers})
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data!=""){
          this.presentToast(data);
         this.limparTexBox();
         this.navCtrl.setRoot(RotinaPage, {}, {animate: true, direction: 'forward'});
        }
        else{
          this.presentToast("Problemas com a Alteração");
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
    this.idRotina=null;
    this.text="";
    this.nomeHtml ="";
    this.localHtml ="";
    this.horaInicioHtml ="";
    this.horaTerminoHtml ="";
    this.observacaoHtml ="";
    this.climaHtml="";
  }

}