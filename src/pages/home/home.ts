import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profilePicture: any = "assets/icon/profile.png"

  constructor(public navCtrl: NavController) {

  }

}
