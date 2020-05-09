import { Component } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service'
import { stringify } from '@angular/core/src/render3/util';
import { reject } from 'q';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { resolve } from 'url';
import { LocationSelectPage } from '../location-select/location-select.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailInput:string;
  passwordInput:string;

  constructor(public CognitoService: CognitoServiceService, public navCtrl : NavController, public alertController : AlertController, public modalCtrl : ModalController) {}


  async presentAlertUserNotFound() {
    const alert = await this.alertController.create({
      header: 'Usuário não cadastrado',
      subHeader: 'Cadastre-se agora clicando em "Criar Conta"',      
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertresendConfirmation() {
    const alert = await this.alertController.create({
      header: 'Feito',
      subHeader: 'Código reenviado para o seu email',
      message: 'Confirme seu email para acessar o aplicativo',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorConfirmation() {
    
    const alert = await this.alertController.create({
      header: 'Ops!',
      subHeader: 'Erro reenviando codigo',
      message: 'Confirmação não pode ser reenviada',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertUserNotConfirmed() {
    const alert = await this.alertController.create({
      header: 'Ops!',
      subHeader: 'Usuário não confirmado',
      message: 'Confirme seu usuário acessando o link no seu email',
      buttons: ['OK',
                {
                  text: "Reenviar Email",
                  handler: () => {
                    this.CognitoService.resendEmail(this.emailInput.toString())
                      .then ( resolved =>{
                        this.presentAlertresendConfirmation();
                      },
                      err => {
                        console.log(err);                     
                        this.presentAlertErrorConfirmation();  
                      })
                  }
                }]
    });

    await alert.present();
  }

  async presentAlertForgotPasswordSuccess () {
    const alert = await this.alertController.create({
      header: 'Senha reiniciada',
      subHeader: 'Acesse seu email para obter o código de verificação.',      
      buttons: [{
                text: "Continuar",
                handler: () => {
                  this.navCtrl.navigateForward('/reset-password/' + this.emailInput);
                }
              }]
    });

    await alert.present();
  }

  async presentAlertForgotPasswordError () {
    const alert = await this.alertController.create({
      header: 'Ops!',
      subHeader: 'Houve um erro ao reiniciar a sua senha.',      
      message: 'Entre em contato com a equipe do forher',
      buttons: ['OK']
    });

    await alert.present();
  }


  login(){               
    
    this.CognitoService.authenticate("pedro.isn1@gmail.com","Gbm@2018")//authenticate(this.emailInput,this.passwordInput)
      .then(res=> {                       
         this.navCtrl.navigateForward('/services');

      },
      err =>{        
        console.log(err.name);
        if(err.name == "UserNotConfirmedException"){
          this.presentAlertUserNotConfirmed();
        }
        else if(err.name == "UserNotFoundException"){
          this.presentAlertUserNotFound();
        }
        
      });

  }

  forgotPassword() {
    this.CognitoService.forgotPassword(this.emailInput)
    .then (res => {
        this.presentAlertForgotPasswordSuccess();
      },
      err => {
        if(err.name == "UserNotFoundException"){
          this.presentAlertUserNotFound();
        }
        else {
          this.presentAlertForgotPasswordError();
        }
      }
    )
  }
}
