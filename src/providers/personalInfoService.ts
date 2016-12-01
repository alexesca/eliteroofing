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
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/clients/one')
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
    this.http.put('https://server-dynamic-port-dashboard.herokuapp.com/api/personalinfo/updateemail/' + "5807a86bf8d0c52d78d5140d",{'email': email})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  

  //Makes the request to the API/REST server to update 
  savePhoneNumber(phoneObject){
    
    let phone: string = phoneObject.phone;
    let carrier: string = phoneObject.carrier;
    let countryCode: string = phoneObject.countryCode;

    //Calls this url and return a parsed json.object
    this.http.put('https://server-dynamic-port-dashboard.herokuapp.com/api/personalinfo/updatephonenumber/' + "5807a86bf8d0c52d78d5140d",{ 'phone': phone, 'carrier' : carrier, 'countryCode':countryCode})
      .subscribe(res => {
        console.log(res.json());
     });
  }

  //Makes the request to the API/REST server to update 
  saveAddress(phoneObject){
    
    let country: string = phoneObject.country;
    let state: string = phoneObject.state;
    let city: string = phoneObject.city;
    let zip: string = phoneObject.zip;
    let address: string = phoneObject.address;

    //Calls this url and return a parsed json.object
    this.http.put('https://server-dynamic-port-dashboard.herokuapp.com/api/personalinfo/updateaddress/' + "5807a86bf8d0c52d78d5140d"
    ,{ 'country': country, 'state' : state, 'city': city, 'address' : address, 'zip' : zip})
      .subscribe(res => {
        console.log(res.json());
     });
  }

}