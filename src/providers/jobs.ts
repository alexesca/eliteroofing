import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ServerUrl } from './serverUrl';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Jobs {
 
  data: any;
  serverUrl: string = new ServerUrl().url;

  constructor(public http: Http) {
    this.data = null;
  }
  //Makes the request to the API/REST server
    getJobsList(){
 
    /*if (this.data) {
      return Promise.resolve(this.data);
    }*/
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object hjhkjhkjhkjh
      this.http.get(this.serverUrl + '/api/pipeline')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

   //Makes the request to the API/REST server
    getOneJob(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get( this.serverUrl + '/api/pipeline/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  //Makes the request to the API/REST server 
  insertJob(job){
    //Solves CROSS errors
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    this.http.post( this.serverUrl + '/api/pipeline', JSON.stringify(job), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  //Makes the request to the API/REST server
  updatePipelineStatus(statusInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    return this.http.put(this.serverUrl + '/api/pipeline/updateStatus', statusInfo, {headers: headers})                        
      .map(res => res.json() )
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