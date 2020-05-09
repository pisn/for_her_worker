import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {CognitoServiceService} from '../cognito-service.service';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  userEmail : string;  
  passwordInput:string;
  verificationCodeInput:string;

  constructor(private route: ActivatedRoute,public navCtrl : NavController,  private cognitoService : CognitoServiceService, private alertController : AlertController) { }

  ngOnInit() {
    this.userEmail = this.route.snapshot.paramMap.get('userEmail');  

  }

  async presentAlertSuccess() {
    
    const alert = await this.alertController.create({
      header: 'Sucesso',      
      message: 'A senha foi reconfigurada',
      buttons: [{
                text: "Voltar a tela inicial",
                handler: () => {
                  this.navCtrl.back();
                }
              }]
    });

    await alert.present();
  }

  async presentAlertError(err : any) {
    
    const alert = await this.alertController.create({
      header: 'Erro',      
      subHeader: 'Houve um problema ao resetar a senha',
      message: err.message,
      buttons: ['OK']
    });

    await alert.present();
  }


  changePassword() {
    this.cognitoService.confirmCode(this.userEmail,this.verificationCodeInput.toString(),this.passwordInput.toString())
    .then (
      resolved => {
        this.presentAlertSuccess();
      },
      err => {
        this.presentAlertError(err);
        this.passwordInput = '';
        this.verificationCodeInput = '';
      }
    )

  }

}
