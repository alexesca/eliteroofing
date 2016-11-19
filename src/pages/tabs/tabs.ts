import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { JobsList } from '../jobs/jobs';
import { AgingReports } from '../aging-reports/aging-reports';
import { ClosingRatio } from '../closing-ratio/closing-ratio';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = JobsList;
  tab2Root: any = AgingReports;
  tab3Root: any = ClosingRatio;
  tab4Root: any = CalendarPage;
  tab5Root: any = PersonalInfoPage;
  //for example
  //tab4Root: any = calendarTab;
  //username = window.localStorage.getItem('username');
      
  constructor(public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {

  }

}
