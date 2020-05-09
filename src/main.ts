import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, { Auth, API } from 'aws-amplify';
import awsConfig from './aws-exports.js'

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));  
  
  Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'ca-central-1:1aa43394-222b-4c1c-a8dc-53f91f4effd9',
        
        // REQUIRED - Amazon Cognito Region
        region: 'ca-central-1',        

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ca-central-1_UKTkSiKAR',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '618ibf867ggo4erplu002t6vf8'
    }
  });

  API.configure(awsConfig);