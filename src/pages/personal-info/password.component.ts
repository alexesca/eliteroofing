import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams, ModalController } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';
import { CarriersModal } from './carrier.modal.component';
/*
  Generated class for the PersonalInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'password-address',
  templateUrl: 'password.component.html',
})
export class PasswordPage {

  //Variables
  phoneNumberInformation: String;
  phone: String;
  carrier: String;
  countryCode: String;

  constructor(private modalCtrl: ModalController ,private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    //this.phoneNumberInformation = this.navParams.get('phoneNumber');
    
  }

  savePassword(phoneObject: any){
    this.personalInfo.savePhoneNumber(phoneObject);
    return;
  }

}
