import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CognitoServiceService } from './cognito-service.service';
import { HttpService } from './http.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Network} from '@ionic-native/network/ngx';
import {GoogleMapsService} from './google-maps.service';
import { ConnectivityService } from './connectivity.service';
import { LocationSelectPage } from './location-select/location-select.page';
import { LocationSelectPageModule } from './location-select/location-select.module';
import { ChatManaPage } from './chat-mana/chat-mana.page';
import {ServicesHandlerService} from './services-handler.service';
import { Camera } from '@ionic-native/camera/ngx';
import { PictureCropperPage } from './picture-cropper/picture-cropper.page';
import { PictureCropperPageModule } from './picture-cropper/picture-cropper.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    LocationSelectPage,
    PictureCropperPage
  ],  
  imports: [
    BrowserModule,    
    IonicModule.forRoot(),
    AppRoutingModule,    
    HttpClientModule, 
    LocationSelectPageModule,
    PictureCropperPageModule       
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    CognitoServiceService,
    ConnectivityService,
    GoogleMapsService,   
    ModalController,
    NavController,
    ServicesHandlerService,
    LocationSelectPage,    
    PictureCropperPage, 
    ChatManaPage,
    Geolocation,
    Platform,
    Network,
    HttpService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
