import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
import Amplify, {Auth} from 'aws-amplify';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class CognitoServiceService {
  user : AWSCognito.CognitoUser;
  userAttributes: any;  
  userName:any;
  userSession : AWSCognito.CognitoUserSession;
  isConnected : boolean;  

  //replace the value with actual value 
  _POOL_DATA = {
    UserPoolId: "ca-central-1_HPRUy2uqY",
    ClientId: "628jthv5lkgv94pp8cntjgps54"
  };  

  getUserSession(){
    return this.userSession;
  }

  getUserId(){
    return this.user.getUsername();
  }

  signUp(email: string, name:string, birthDate:string, password: string, cpf: string,  address:string) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "name", Value: name }),
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email }),
        new AWSCognito.CognitoUserAttribute({ Name: "address", Value: address }),
        new AWSCognito.CognitoUserAttribute({ Name: "birthdate", Value: birthDate }),
        new AWSCognito.CognitoUserAttribute({ Name: "custom:cpf", Value: cpf })
      );
      
      userPool.signUp(email, password, userAttribute, null, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  authenticate(email, password) {    
    this.userName = "Autenticating";
    
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });
      
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {          
          this.userSession = result;
          this.isConnected = true;
          this.user = cognitoUser;

          Auth.signIn(email, password).then(res => {
            console.log('Logged in Amplify')
          })          

          this.user.getUserAttributes((err, attrs) => {
            
            const payload = {};
            attrs.forEach(attr => (payload[attr.getName()] = attr.getValue()));            
            this.userAttributes = payload
            console.log(this.userAttributes);
            this.userName = this.userAttributes['name'];
          });

          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });    
  }

  resendEmail(email){
    return new Promise((resolve,reject) => {

      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.resendConfirmationCode( 
        err => { 
          if(err != null){
            console.log(err);
            reject(err);    
          }      
          else{
            resolve();
          }
        }        
      );

    });
  }

  forgotPassword(email){
    return new Promise((resolve,reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.forgotPassword( 
        {
          onSuccess: result => {
            resolve(result);
          },
          onFailure: err => {
            console.log(err);
            reject(err);
          }
        }
      )
     });
  }

  confirmCode(email, verificationCode, newPassword){
    return new Promise((resolve,reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.confirmPassword(verificationCode, newPassword, 
        {
          onSuccess: () => {
            resolve(null);
          },
          onFailure: err => {
            console.log(err);
            reject(err);
          }
        });
    });


  }

  constructor() { 
    this.isConnected = false;
  }
}
