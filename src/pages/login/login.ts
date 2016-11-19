import { Component } from '@angular/core';
import { Auth, User } from '@ionic/cloud-angular';
//import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController } from 'ionic-angular';
//import { InAppBrowser } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service';

//Creating the login component fdsrfwerwerewrewrewrer
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  loading: any;
  loginError: string;
  remember: boolean;
  constructor(public authService: AuthService ,public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }
 //Log in the user
 onSubmit(email: string, password: string, rememberMe: boolean):void{

   let details = {'email': email, 'password': password};

   this.auth.login('basic', details,{'remember': rememberMe}).then(() => {
      //this.navCtrl.setRoot(TabsPage); //It should be used custom auth
      this.loginError = null;
      this.navCtrl.push(TabsPage, {}, {animate: true});
   }, (err) => {
     console.log(err);
     if(err.message === 'UNPROCESSABLE ENTITY'){
       this.loginError = "The username or password is incorrect"
     }else if(err.message === 'email and password are required for basic authentication')
       this.loginError = 'Email and password are required';
     else{
       this.loginError = err.message;
     }
 });
 return;
}

 /* showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });
 
    this.loading.present();
 
  }
 
  signupEmail(email, password){
 
    this.showLoader();
 
    let details: UserDetails = {
        'email': email, 
        'password': password
    };
 
    this.auth.signup(details).then(() => {
 
        this.loading.dismiss();
 
        // success
        console.log(this.user);
 
    }, (err: IDetailedError<string[]>) => {
 
        this.loading.dismiss();
 
        // handle errors
        for(let error of err.details){
 
            if(error === 'required_email'){
                // email missing
            } else if(error === 'required_password'){
                // password missing
            } else if(error === 'conflict_email'){
                // email already in use
            } else if (error === 'conflict_username'){
                // username alerady in use
            } else if (error === ' invalid_email'){
                // email not valid
            }
 
        }
 
    });
 
  }
 
  login(email, password){
 
    this.showLoader();
 
    let details: UserDetails = {
        'email': email,
        'password': password
    };
 
    this.auth.login('basic', details).then(() => {
 
        this.loading.dismiss();
 
        // success
        console.log(this.user);
 
    }, (err) => {
 
        this.loading.dismiss();
 
        // problem logging in
        console.log(err);
 
    });
 
  }
 
  logout(){
    this.auth.logout();
  }
 
  testSignup(){
    this.signupEmail('me@test.com', 'password');
  }
 
  testLogout(){
    this.logout();
  }
 
  testLogin(){
    this.login('me@test.com', 'password');
  }
 */
}
