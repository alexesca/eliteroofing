import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthService {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  //Makes the request to the API/REST server
    authUser(){
     return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('http://localhost:8080/auth')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
}