import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PersonalInfoService {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }

  //Makes the request to the API/REST server
    getPersonalInfo(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
       //Calls this url and return a parsed json.object
      this.http.get('http://localhost:8080/api/clients/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  //Makes the request to the API/REST server to update 
  saveEmail(email){
    //Calls this url and return a parsed json.object
    this.http.get('http://localhost:8080/api/personalinfo/updateemail/' + email)
      .subscribe(res => {
        console.log(res.json());
      });
  }

  //Makes the request to the API/REST server to update 
  savePhoneNumber(phoneObject){
    
    let phone = phoneObject.phone;
    let carrier = phoneObject.carrier;
    let countrCode = phoneObject.countryCode;

    //Calls this url and return a parsed json.object
    this.http.get('http://localhost:8080/api/personalinfo/updatephonenumber?phone=' + phone + '&carrier=' + carrier + '&countryCode=' + countrCode)
      .subscribe(res => {
        console.log(res.json());
     });
  }

}