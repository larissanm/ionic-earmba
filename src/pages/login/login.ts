import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData = {"id_cad":"","login":"","id_neuro":"","nome":"","email":"", "senha":"","sexo":"","permissao":"","datanasc":"","rg":"","telefone":""};
  loginHtml: string
  senhaHtml: string


  

  constructor(public navCtrl: NavController, public navParams: NavParams ,public authService:AuthServiceProvider,private toastCtrl :ToastController,private http:Http,private storage: Storage) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void{
//(linha de exemplo de get)this.http.get(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.login + `/?email=${this.email}&senha=${this.senha}`).map(res => res.json())
let headers = new Headers();
headers.append('Content-Type', 'application/json');

let data = { 'login': this.loginHtml, 'senha': this.senhaHtml};    

this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.login, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => { 
          if(data!=""){
          this.userData=data
          console.log("data "+ this.userData.email);
          this.storage.set('userData',this.userData);
          this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
          }
          else{
            this.presentToast("Email e/ou Senha Invalidos");
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