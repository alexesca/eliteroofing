import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { LoginPage } from '../login/login';
import { EmailPage } from './email.component';
import { PhoneNumberPage } from './phone.component';
import { AddressPage } from './address.component';
import { PasswordPage } from './password.component';
import { PersonalInfoService } from '../../providers/personalInfoService';
@Component({
  selector: 'password-info',
  templateUrl: 'personal-info.html'
})


//Class for personalinfo
export class PersonalInfoPage {

  personalInformation: any;
  email: String;
  address: String;
  phoneNumber: String;
  carrier: String;
  countryCode: String;

  constructor(private personalInfo: PersonalInfoService,private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.getPersonalInfo();
  }

  goToEmail(){
      this.navCtrl.push(EmailPage,{ email: this.email});
  }

  goToPhoneNumber(){
      this.navCtrl.push(PhoneNumberPage,{ phoneNumberInformation: this.phoneNumber,
        carrier : this.carrier,
        countryCode : this.countryCode
      });
  }

  goToAddress(){
      this.navCtrl.push(AddressPage);
  }

  goToPassword(){
      this.navCtrl.push(PasswordPage);
  }


  signOut(){
    this.auth.logout();
    const root = this._app.getRootNav();
    root.popToRoot();
  }

  getPersonalInfo(){
    this.personalInfo.getPersonalInfo().then((data) => {
      this.personalInformation = data;
      this.email = this.personalInformation.primaryEmailAddress;
      this.phoneNumber = this.personalInformation.primaryPhoneNumber.number;
      this.carrier = this.personalInformation.primaryPhoneNumber.carrier;
      this.countryCode = this.personalInformation.primaryPhoneNumber.countryCode;
      this.address = this.personalInformation.primaryAddresse.address;
    });
  }

}
