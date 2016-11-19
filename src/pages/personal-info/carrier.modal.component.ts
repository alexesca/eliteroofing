import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'select-carrier',
  templateUrl: 'carrier.modal.component.html',
})

export class CarriersModal {
     //Array contains all the options of did not buy
     carriers = [
              "T-mobile",
              "Verizon",
              "Sprint",
        ];
     carrierSelected: String;
    constructor(public viewController: ViewController){ }

    //function called when th users hits done without selecting any of the reasons
        closeCarriersModal(){
            this.viewController.dismiss();
        }
    
    //The user selected one reason, the tabs is closed automatically and the operation is stored in the database. 
        selectedCarriersModal(option){
            let carrierSelected= {
                carrier: option 
            } 
            this.viewController.dismiss(carrierSelected);
        }
        
}