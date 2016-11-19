import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';
/*
  Generated class for the PersonalInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-email',
  templateUrl: 'email.component.html',
  inputs: ['email']
})
export class EmailPage {

  //Variables
  emails: String;

  constructor(private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.emails = this.navParams.get('email');
  }

  saveEmail(email: String){
    this.personalInfo.saveEmail(email);
    return;
  }


}
