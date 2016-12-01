import { ToastController } from 'ionic-angular';

export class ToastModule{
    constructor(message: string,showCloseButton:boolean, closeButton:  string, duration: number, position: string, cssClass?: string){
        let toast = {
              message: message,
              showCloseButton: showCloseButton,
              closeButtonText: closeButton,
              duration: duration,
              position: position,
              cssClass: "toast-container"

        }
        return toast;
            
    }

}