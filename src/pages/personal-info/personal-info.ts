import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { LoginPage } from '../login/login';
import { EmailPage } from './email.component';
import { PhoneNumberPage } from './phone.component';
import { AddressPage } from './address.component';
import { PasswordPage } from './password.component';
import { PersonalInfoComponente } from './personalInfo.component';
import { PersonalInfoService } from '../../providers/personalInfoService';
@Component({
  selector: 'password-info',
  templateUrl: 'personal-info.html'
})

//add a coment

export class PersonalInfoPage {

  personalInformation: any;
  email: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;

  phoneNumber: string;
  carrier: string;
  countryCode: string;
  name: string;

  errorMessage: any;


  constructor(private personalInfo: PersonalInfoService,private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.getPersonalInfo();
  }

  ionViewDidEnter(){
    this.getPersonalInfo();
  }

  goToEmail(){
      this.navCtrl.push(EmailPage,{ email: this.email});
  }

  goToPhoneNumber(){
      this.navCtrl.push(PhoneNumberPage,{ phone: this.phoneNumber,
        carrier : this.carrier,
        countryCode : this.countryCode
      });
  }

  goToAddress(){
      this.navCtrl.push(AddressPage,{
        country: this.country,
        state: this.state,
        city: this.city,
        address: this.address,
        zip: this.zip 
      });
  }

  goToPassword(){
      this.navCtrl.push(PasswordPage,{email: this.email});
  }


  signOut(){
    this.auth.logout();
    const root = this._app.getRootNav();
    root.popToRoot();
  }

  getPersonalInfo(){
    this.personalInfo.getPersonalInfo().then((data) => {
      if(data.status !== "error"){
        this.personalInformation = data.data;
        this.name = this.personalInformation.firstName + " " + this.personalInformation.lastName
        this.email = this.personalInformation.primaryEmailAddress;
        this.phoneNumber = this.personalInformation.primaryPhoneNumber.number;
        this.carrier = this.personalInformation.primaryPhoneNumber.carrier;
        this.countryCode = this.personalInformation.primaryPhoneNumber.countryCode;
        this.address = this.personalInformation.primaryAddress.address;
        this.country = this.personalInformation.primaryAddress.country;
        this.state = this.personalInformation.primaryAddress.state;
        this.city = this.personalInformation.primaryAddress.city;
        this.zip = this.personalInformation.primaryAddress.zip;
      }else{
        this.errorMessage = data.message;
        console.log(data)
      }
    }).catch(error => {this.errorMessage = error});

  }


}
