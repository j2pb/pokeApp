import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPageModule } from '../pages/detail/detail.module';

import { HttpClientModule } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook';

//providers

import { ApiProvider } from '../services/api.service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    DetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook
  ]
})
export class AppModule { }
