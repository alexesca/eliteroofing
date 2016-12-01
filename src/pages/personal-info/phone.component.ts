import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams, ModalController } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';
import { CarriersModal } from './carrier.modal.component';
import { ToastController } from 'ionic-angular';
import { ToastModule } from '../../modules/toast.module';
import { Observable } from 'rxjs'

/*
 pages and navigation.
*/
@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone.component.html',
})
export class PhoneNumberPage {

  //Variables
  phoneNumberInformation: String;
  phone: String;
  carrier: String;
  countryCode: number;
  errorMessage: any;

  constructor(private toastCtrl: ToastController, private modalCtrl: ModalController ,private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.phone = this.navParams.get('phone');
    this.carrier = this.navParams.get('carrier');
    this.countryCode = 1;//this.navParams.get('countryCode');
  }

  savePhoneNumber(phoneObject: any){
    this.personalInfo.savePhoneNumber(phoneObject)
    .subscribe(
      data => {
         // Confirm to the user it was saved
         const toast = this.toastCtrl.create(new ToastModule('The phone number was saved', true, 'Ok',3000, "middle"));
         toast.present();
         this.errorMessage = null;
         return true;
       },
      error => this.errorMessage = "There was an error saving the phone number"
    );
    return;
  }

  selectCarrier(){
      //Creates the modal
        let modal = this.modalCtrl.create(CarriersModal);
        //when modal is closed
        modal.onDidDismiss(carrierSelected => {
          if(carrierSelected){
            this.carrier = carrierSelected.carrier;
          }
        });
        modal.present();
        return;
        //Informs the user about the changes
        //I still need to get the response from the server if it was saved successfully or there was any error
  }

}
