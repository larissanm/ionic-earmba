import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { InserirAtividadePage } from '../../pages/inserir-atividade/inserir-atividade';


import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RotinaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotina',
  templateUrl: 'rotina.html',
})
export class RotinaPage {

  public rootPage: any;

  public atividade2: string;

  rotinas : { 'id_cad':"",'nome':"", 'local':"", 'hora_inicio': "", 'hora_termino': "", 'observacao': "", 'clima': "",'data':""}[];    
  
  userData = {"id_cad":""};

  userDataCarregado :boolean =false;

  date :string;
  dateSplit : string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl :ToastController,private http:Http,private storage: Storage) {

    this.rootPage = InserirAtividadePage;

    this.atividade2 = "Trabalhando em como carregar o template.";

    this.carregaUserdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RotinaPage');
  }

  dataAtual: Date = new Date();

  public dataHoje(): string {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
}

     spplitedDate = this.dataHoje().split("/", 3);

  //verfica se os dados do usuario Ja foram armazendos em Userdata para poder fazer a requisição http
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
    //carrega a lista de Atividade
     carregarList(){
      this.date=this.dataHoje().replace("/","-");
      this.date=this.date.replace("/","-");
      this.dateSplit=this.date.split("-");
      this.date=this.dateSplit[2]+"-"+this.dateSplit[1]+"-"+this.dateSplit[0];
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = { 'id_cad': this.userData.id_cad, 'data':this.date};  
      console.log(data);console.log(this.userDataCarregado);
      this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.rotinas.pesquisar, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => { 
          if(data!=""){
          this.rotinas=data;
          }
          else{
            this.presentToast("o dia Atual Não possue rotinas");
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

armazenarRotina(rotina : any){
  this.storage.set('rotina',rotina);
}

}  

