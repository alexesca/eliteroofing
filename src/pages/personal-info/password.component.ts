import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams, ModalController } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';


@Component({
  selector: 'password-address',
  templateUrl: 'password.component.html',
})
export class PasswordPage {


  email: string;

  constructor(private modalCtrl: ModalController ,private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
  }

  requestPasswordReset(){
    console.log(this.email);
    this.auth.requestPasswordReset("alexescamore@gmail.com");
    return;
  }

}
