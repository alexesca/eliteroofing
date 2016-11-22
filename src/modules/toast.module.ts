import { ToastController } from 'ionic-angular';

export class ToastModule{
    constructor(message: string,showCloseButton:boolean, closeButton:  string, duration: number){
        let toast = {
              message: message,
              showCloseButton: showCloseButton,
              closeButtonText: closeButton,
              duration: duration
        }
        return toast;
            
    }

}