import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestionsPage } from '../../pages/add-questions/add-questions';

/**
 * Generated class for the QuestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  addQuestion(): void{
    //this.navCtrl.setRoot(AddQuestionsPage, {}, {animate: true, direction: 'forward'});
    this.navCtrl.push(AddQuestionsPage);
  }
}
