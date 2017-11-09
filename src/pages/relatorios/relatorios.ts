import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
//import { CurrentWeekNumber } from 'current-week-number';

import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  pet: string = "puppies";
  isAndroid: boolean = false;

  userData = { "id_cad": "" };

  week: number;
  dia: number;
  mes: number;
  ano: number;

  notasDiarias: { 'id_nota_diaria': "", 'id_cad': "", 'resultadommes': "", 'resultadotp': "", 'resultadotf': "", 'data': "", 'semana': "" }[];
  resultadoMMES: number[];
  resultadoTP: number[];
  resultadoTF: number[];
  dias: string[];
  // lineChart
  public lineChartData: Array<any> = [
    { data: [0, 1, 2, 3, 4, 5, 30], label: 'MN Mental' },
    { data: [0, 1, 2, 3, 4, 5, 30], label: 'Fotografico' }
  ];
  public lineChartLabels: Array<any> = ['Seg', 'Ter', 'Quar', 'Quin', 'Sex', 'Sab', 'Dom'];
  public lineChartOptions: any = {
    responsive: false
  };
  public lineChartColors: Array<any> = [
    { // pink
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: ' rgba(224, 30, 57, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(0, 199, 131, 1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = (Math.random() + Math.random()) * 100;
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private http: Http, private storage: Storage) {
    var date = new Date();
    this.dia = date.getDate();
    this.mes = date.getMonth() + 1;
    this.ano = date.getFullYear();
    storage.get('userData').then((val) => {
      this.userData.id_cad = val.id_cad;
      console.log('Value', this.userData.id_cad);
      this.gerarGrafico();
    });

    console.log(this.week);
  }

    /**
   * evento para mudar o grafico arrastando na tela
   */
  swipeEvent(e) {
    if (e.direction == 2) {
        this.presentToast("Semana anterior.");
    }
    else {
        this.presentToast("Semana posterior.");
    }
}

  clickAnt(){
    this.presentToast("Semana anterior.");
  }

  clickPost(){
    this.presentToast("Semana posterior.");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatoriosPage');
  }

  /**
   * gerarGrafico
   */
  public gerarGrafico() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = { 'id_cad': this.userData.id_cad, 'data': this.ano + "-" + this.mes + "-" + this.dia };

    this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.relatorio.gerarGrafico, JSON.stringify(data), { headers: headers })
      .map(res => res.json())
      .subscribe(
      data => {
        if (data != "") {
          console.log(data);
          this.notasDiarias = data;
          this.resultadoMMES = new Array();
          this.resultadoTF = new Array();
          this.resultadoTP = new Array();
          this.dias = new Array();
          for (var l = 0; l < data.length; l++) {
            console.log("er :" + data[l].resultadommes);
            this.resultadoMMES.push(data[l].resultadommes);
            this.resultadoTF.push(data[l].resultadotf);
            this.resultadoTP.push(data[l].resultadotp);
            //
            let dia: string = data[l].data;
            let dias: string[] = dia.split("-");
            this.dias[l] = dias[1] + "/" + dias[2]
          }
          console.log(this.resultadoMMES + " :ar");

          let _lineChartData: Array<any> = new Array(this.lineChartData.length);
          for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
              if (i == 0) {
                _lineChartData[i].data[j] = this.resultadoMMES[j];
              }
              else if (i == 1) {
                _lineChartData[i].data[j] = this.resultadoTF[j];
              }
              else if (i == 2) {
                _lineChartData[i].data[j] = this.resultadoTP[j];
              }
            }
          }
          this.lineChartData = _lineChartData;



          // this.randomize();
        }
        else {
          this.presentToast("Problemas com o Grafico");
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
