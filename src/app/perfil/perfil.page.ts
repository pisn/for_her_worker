import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';
import {AwsApiConnectService} from '../aws-api-connect.service'
import { LocationSelectPage } from '../location-select/location-select.page';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cpf: string;
  subserviceDetails: Array<any>;  
  subserviceDetailsCaptions: any;
  prestadoraServices: Array<string>;

  constructor(private cognitoService: CognitoServiceService, private awsService : AwsApiConnectService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.cpf = this.cognitoService.userAttributes['custom:cpf'];

    this.awsService.getSubservices("All").then((result: any) => {
      this.subserviceDetails = result.Items;            
      this.subserviceDetailsCaptions = result.Items.reduce(function(map, obj) {
          map[obj.serviceDetail] = obj
          return map;
      });
      console.log(this.subserviceDetailsCaptions);
    });

    this.awsService.getPrestadoraProfile().then((res : any) => {
      this.prestadoraServices = Array.from(Object.keys(res.body.priceTable));          
    });
  }   
}
