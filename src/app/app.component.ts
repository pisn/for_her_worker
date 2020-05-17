import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CognitoServiceService } from './cognito-service.service';
import {AwsApiConnectService  } from './aws-api-connect.service';
import {CommonUtilsService} from './common-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Meu Perfil',
      url: '/perfil',
      icon:'person',
      restricted: true
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      restricted: false
    },    
    {
      title: 'Favoritos',
      url: '/favorites',
      icon:'star',
      restricted: true
    },
    {
      title: 'Ordens de Serviço',
      url: '/my-orders',
      icon:'list',
      restricted: true
    },
    {
      title: 'Pagamento',
      url: '/payment',
      icon:'card',
      restricted: true
    },
    {
      title: 'Logout',
      url: '/logout',
      icon:'log-out',
      restricted: true
    }
    
  ];

  isLogged(){
    return this.cognitoService.isConnected;
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cognitoService : CognitoServiceService    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
