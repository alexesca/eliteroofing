import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams, ModalController } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';
import { CarriersModal } from './carrier.modal.component';
import { ToastModule } from '../../modules/toast.module';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the PersonalInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-address',
  templateUrl: 'address.component.html',
})
export class AddressPage {

  //variables
  country: string;
  state: string;
  address: string;
  zip: string;
  city: string;
  errorMessage: string;

  constructor(private toastCtrl: ToastController, private modalCtrl: ModalController ,private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.country = this.navParams.get('country');
    this.state = this.navParams.get('state');
    this.city = this.navParams.get('city');
    this.address = this.navParams.get('address');
    this.zip = this.navParams.get('zip');
    console.log(this.navParams);
  }

  saveAddress(addressObject: any){
    this.personalInfo.saveAddress(addressObject)
    .subscribe(
      data => {
         // Confirm to the user it was saved
         const toast = this.toastCtrl.create(new ToastModule('Email was saved', true, 'Ok',3000,"middle",""));
         toast.present();
         this.errorMessage = null;
         return true;
       },
      error => this.errorMessage = "There was an error updating the address"
    );
    return;
  }

}
