import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { QuestionsPage } from '../questions/questions';
/**
 * Generated class for the AddQuestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-questions',
  templateUrl: 'add-questions.html',
})
export class AddQuestionsPage {
  
  base64Img :string;
  imageFileName:any;
  userData = {"id_cad":""};
  htmlQuestion : string;
  htmlAwnser :string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private storage: Storage,
    public actionSheetCtrl: ActionSheetController, private camera: Camera,private transfer: FileTransfer,public toastCtrl: ToastController) {
      this.base64Img;
      this.storage.get('userData').then((val) => {
        this.userData.id_cad=val.id_cad;    
      });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestionsPage');
  }

  public imgActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Imagem',
      buttons: [
        {
          text: 'Da Galeria',
          handler: () => {
            this.selectPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Tirar Foto',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePhoto(PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64Img=base64Image;
    }, (err) => {
      // Handle error
    });
  }

  public selectPhoto(PictureSourceType) {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Img = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

  addQuestion(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
      let options: FileUploadOptions = {
        fileKey: 'ionicfile',
        fileName: 'ionicfile',
        chunkedMode: false,
        mimeType: "image/jpeg",
      
      }
    
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = {'img':this.base64Img,'id_cad':this.userData.id_cad,'pergunta_vol':this.htmlQuestion,'resposta_vol':this.htmlAwnser};  
      this.http.post(EarmbaConstantes.BASE_URL + '/' + EarmbaConstantes.Auth.pergunta.inserir, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => { 
          if(data!=""){
        this.presentToast(data);
        this.navCtrl.setRoot(QuestionsPage, {}, {animate: true, direction: 'forward'});
          }
          else{
            this.presentToast("Problemas Com A Inserção da Pergunta");
          }
        }, 
        err => {
          console.log("rej" + err);
          this.presentToast("rej"+err);
        }
      );  


  /*let filename = this.base64Img.split('/').pop();
  let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': "gd", 'description': "yes" }
  };
  const fileTransfer = new FileTransferObject();

fileTransfer.upload(this.base64Img,EarmbaConstantes.BASE_URL+'/'+EarmbaConstantes.Auth.pergunta.inserir,
  options).then((entry) => {
  this.presentToast(entry)
  }, (err) => {
      alert(JSON.stringify(err));
  });
  */
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
    });
    toast.present();
    }

}
