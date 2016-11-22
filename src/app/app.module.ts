import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { JobsList } from '../pages/jobs/jobs';
import { JobDetails } from '../pages/jobs/jobDetails.component';
import { DidNotBuyExplained } from '../pages/jobs/didNotBuyExplained.component';
import { AgingReports } from '../pages/aging-reports/aging-reports';
import { AgingReportsDetails } from '../pages/aging-reports/agingReportDetails.component';
import { ClosingRatio } from '../pages/closing-ratio/closing-ratio';
import { Jobs } from '../providers/jobs';
import { Clients } from '../providers/clients';
import { AuthService } from '../providers/auth-service';
import { AgingReportsProvider } from '../providers/agingReports';
import { ClosingRatioProvider } from '../providers/closingRatio';
import { PersonalInfoService } from '../providers/personalInfoService';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JobItem } from '../pages/jobs/jobItem.component';
import { ContractItem } from '../pages/aging-reports/jobItem.component';
import { MyApp } from './app.component';
import {CloudSettings, CloudModule  } from '@ionic/cloud-angular';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { EmailPage } from '../pages/personal-info/email.component';
import { PhoneNumberPage } from '../pages/personal-info/phone.component';
import { CarriersModal } from '../pages/personal-info/carrier.modal.component';
import { AddressPage } from '../pages/personal-info/address.component';
import { PasswordPage } from '../pages/personal-info/password.component';
import { PersonalInfoComponente } from '../pages/personal-info/personalInfo.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
//Using cloud settings
//import { AuthHttp, AuthConfig,AUTH_PROVIDERS } from 'angular2-jwt';
//import { Http } from '@angular/http';
//import { Storage } from '@ionic/storage';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7a1365fe'
  }
};


//Includes all the provider and componenets needed to render the application
@NgModule({
  //Add your component here
  declarations: [
    TabsPage,
    JobsList,
    JobDetails,
    DidNotBuyExplained,
    AgingReports,
    AgingReportsDetails,
    ClosingRatio,
    JobItem,
    ContractItem,
    MyApp,
    LoginPage,
    SignUpPage,
    PersonalInfoPage,
    CalendarPage,
    EmailPage,
    PhoneNumberPage,
    CarriersModal,
    AddressPage,
    PasswordPage,
    PersonalInfoComponente
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  //Add that same component here again hkhkjhk
  entryComponents: [
    TabsPage,
    JobsList,
    JobDetails,
    DidNotBuyExplained,
    AgingReports,
    AgingReportsDetails,
    ClosingRatio,
    JobItem,
    ContractItem,
    MyApp,
    LoginPage,
    SignUpPage,
    PersonalInfoPage,
    CalendarPage,
    EmailPage,
    PhoneNumberPage,
    CarriersModal,
    AddressPage,
    PasswordPage,
    PersonalInfoComponente
  ],
  //Add your providers or services here
  providers: [Jobs, Clients, AgingReportsProvider, ClosingRatioProvider, AuthService,PersonalInfoService]
})
export class AppModule {}