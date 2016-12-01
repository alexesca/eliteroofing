import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ViewController, NavController, ToastController, AlertController, ModalController  } from 'ionic-angular';
import { JobsModel } from './jobs.model';
import { JobDetails } from './jobDetails.component';
import {CallNumber, SMS} from 'ionic-native';
import {CallCustomer} from '../../modules/call.module';
import {TextCustomer} from '../../modules/text.module';
import { Jobs } from '../../providers/jobs';
import {ConfirmAlert} from '../../modules/confirmAlert.module';
import { DidNotBuyExplained } from './didNotBuyExplained.component';
import { ToastModule } from '../../modules/toast.module';

@Component({
  selector: 'job-item',
  templateUrl: 'jobItem.component.html',
  entryComponents:[ JobDetails, JobItem ],
})

//Class did not buy explained 
export class JobItem {
    
    jobInfo: {};
    reason: any;
    callPhoneNumber: CallCustomer;
    confirmAlert: ConfirmAlert;
    showJobComponent: boolean;
    currentStatus: String;
    _id : String;
    note : String;
    @Input() jobItemObject: JobsModel;
    //constructor
    constructor( public viewController: ViewController, public toastCtrl: ToastController, public nav: NavController, public jobService: Jobs, public alertCtrl: AlertController, public modalCtrl: ModalController){     
      this.showJobComponent = true;
    }

    //Displays the info of the lead in a different page.
  //Pass this object a a parameter
    pushJobDetails(jobItem) {
      this.jobInfo = {
        _id: jobItem._id,
        firstName: jobItem._idPeople.firstName,
        middleName :  jobItem._idPeople.middleName,
        lastName : jobItem._idPeople.lastName,
        phoneNumber: jobItem._idPeople.primaryPhoneNumber.number,
        street: jobItem.address.street,
        zipCode: jobItem.address.zipCode,
        city: jobItem.address.city,
        state: jobItem.address.state,
        createdAt: jobItem.createdAt,
        currentStatus: jobItem.currentStatus,
        jobType: jobItem.jobType,
        source: jobItem.marketing.source,
        sector: jobItem.sector,
        note: jobItem.currentStatusNote,
        email: jobItem._idPeople.primaryEmailAddress
      }
      this.nav.push(JobDetails,this.jobInfo);
      /*let index = _.remove(this.jobs, function(o) { return o._id == jobItem._id; })
      console.log(this.jobs);*/
    }

    callCustomer(phoneNumber: string, byPassAPI: boolean){
        this.callPhoneNumber = new  CallCustomer(phoneNumber, byPassAPI);
    }

    textCustomer(phoneNumber: string, message: string){
        this.callPhoneNumber = new  TextCustomer(phoneNumber, message);
    }

    ChangePipelineStatus(status){
      let confirm = this.alertCtrl.create({
      title: "Change status",
      message: "It will change the current status",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancel");
          }
        },
        {
          text: "Change",
          handler: () => {
              let statusInfo = {
                  _id: this.jobItemObject._id,
                  status:  status,
                  statusNote:  ""
                }
              this.jobService.updatePipelineStatus(statusInfo).subscribe(
                data => {
                  // Confirm to the user it was saved
                  const toast = this.toastCtrl.create(new ToastModule('Status was changed to ' + statusInfo.status, true, 'Ok',3000,"middle","redToast"));
                  toast.present();
                  this.showJobComponent = false;
                  return true;
                },
                error => {
                  const toast = this.toastCtrl.create(new ToastModule('There was an error', true, 'OK',5000,"middle",".toast-container"));
                  toast.present();
                  this.showJobComponent = true;
                  return true;
                }
              );
          }
        }
      ]
    }
    );
    confirm.present();

    }

      //If the user changes the status or hits the select box with the status,
  //the modal to pick the "did not buy" reason is pushed on to the top of the caller class or page 
  statusWasSelected(){

      //Creates the modal
        let modal = this.modalCtrl.create(DidNotBuyExplained);
        //when modal is closed
        modal.onDidDismiss(reasonSelected => {
          // is a reason is selected, store it in the DB. 
          if(reasonSelected){
            /*let statusInfo = {
              _id: this._id,
              status: "Didn't buy",
              statusNote: reasonSelected.reason
            }
            this.jobService.updatePipelineStatus(statusInfo);
            this.note = reasonSelected.reason;*/
            //this.reviews.push(review);
            //this.reviewService.createReview(review);   oo  oo
            //Informs the user about the changes
            this.ChangePipelineStatus("Didn't buy");   
          }
        });
        modal.present();
  }

}