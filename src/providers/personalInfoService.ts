import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ServerUrl } from './serverUrl';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PersonalInfoService {
 
  data: any;
  DataMessage: any;
  serverUrl: string = new ServerUrl().url;
  saveEmailData:any;

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
      this.http.get(this.serverUrl + '/api/clients/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = {status: "ok", message: "Got the personal info of the customer", "data": data}; 
          resolve(this.data);
        }, error => { resolve({status: "error", message: "Error trying to get the personal info of the user.", "error": error})
    });
    });
  }

  //Makes the request to the API/REST server to update 
  saveEmail(email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    return this.http.put(this.serverUrl + '/api/personalinfo/updateemail/' + "5807a86bf8d0c52d78d5140d",{"email": email}, {headers: headers})
      .map((res: Response) => res.json())
      .catch(this.handleError); 
  }

  

  //Makes the request to the API/REST server to update 
  savePhoneNumber(phoneObject){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    return this.http.put(this.serverUrl + '/api/personalinfo/updatephonenumber/' + "5807a86bf8d0c52d78d5140d",phoneObject, {headers: headers})

    .map(res => res.json())
    .catch(this.handleError)
  }

  //Makes the request to the API/REST server to update 
  saveAddress(phoneObject){
    //Headers to solve CROSS origin errors
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Building our object to send data to the server/end point
    let country: string = phoneObject.country;
    let state: string = phoneObject.state;
    let city: string = phoneObject.city;
    let zip: string = phoneObject.zip;
    let address: string = phoneObject.address;

    //Calls this url and return a parsed json.object
    return this.http.put(this.serverUrl + '/api/personalinfo/updateaddress/' + "5807a86bf8d0c52d78d5140d"
    ,{ 'country': country, 'state' : state, 'city': city, 'address' : address, 'zip' : zip},  {headers: headers})
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}