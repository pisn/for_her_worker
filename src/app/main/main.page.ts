import { Component, OnInit } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service';
import { AlertController, ModalController } from '@ionic/angular';
import { LocationSelectPage } from '../location-select/location-select.page';
import { AwsApiConnectService } from '../aws-api-connect.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  name: string;
  rating: number;
  prestadoraProfile: any;

  constructor(private cognitoService: CognitoServiceService, private awsService : AwsApiConnectService, private alertController: AlertController, private modalCtrl: ModalController) { }

  ngOnInit() {
    
    this.name = this.cognitoService.userName;
    this.rating = 4.8;

    this.awsService.getPrestadoraProfile().then((res : any) => {
        this.prestadoraProfile = res.body;
        console.log(res);
    });
  }

  async presentAlertAddress () {
    const alert = await this.alertController.create({
      header: 'Selecionando sua base',      
      message: 'Sua base determinará a sua proximidade para suas clientes. Selecione a área que seja mais acessível para você. Não se preocupe, ela pode ser alterada depois.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async launchLocationPage(){

    this.presentAlertAddress();

    let modal = await this.modalCtrl.create({
      component: LocationSelectPage      
    });

    await modal.present();
    
    modal.onDidDismiss().then ((location) => {
      var newPrestadora = {
        prestadoraId : this.cognitoService.getUserId(),
        coordinates: {
          latitude: location.data.lat,
          longitude: location.data.lng
        },
        nome: this.cognitoService.userName,
        rating: 5
      }

      this.awsService.insertToTable("prestadoras", newPrestadora);
    })
  }

}
