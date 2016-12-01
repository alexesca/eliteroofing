import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController, App, NavParams } from 'ionic-angular';
import { PersonalInfoService } from '../../providers/personalInfoService';
import { ToastModule } from '../../modules/toast.module';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs'
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

  emails: String;
  errorMessage: any;
  constructor(private toastCtrl: ToastController ,private personalInfo: PersonalInfoService,public navParams: NavParams, private _app: App, public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    this.emails = this.navParams.get('email');
  }

  saveEmail(email: string){
    this.personalInfo.saveEmail(email).subscribe(
       data => {
         // Confirm to the user it was saved
         const toast = this.toastCtrl.create(new ToastModule('Email was saved', true, 'Ok',3000,"middle"));
         toast.present();
         this.errorMessage = null;
         return true;
       },
       error => {
         this.errorMessage = "There was an error updating the email";
         //return Observable.throw(error);
       }
    );
    return;
  }
}
