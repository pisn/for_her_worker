import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';
import {AwsApiConnectService} from '../aws-api-connect.service'
import { LocationSelectPage } from '../location-select/location-select.page';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import {ServicesHandlerService} from '../services-handler.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cpf: string;    
  subservices: Array<any>;
  services:Array<any>;
  subservicesDetails:Array<any>;
  prestadoraServices: Array<string>;
  assembledServiceList: Array<any>;

  constructor(private cognitoService: CognitoServiceService, private awsService : AwsApiConnectService, private modalCtrl: ModalController, private alertController: AlertController, private servicesHandler : ServicesHandlerService) { }

  ngOnInit() {
    this.cpf = this.cognitoService.userAttributes['custom:cpf'];

    let promiseDetails = this.servicesHandler.getSubserviceDetails();
    promiseDetails.then((res) => {
      console.log(res)
      this.subservicesDetails = res;        
    });                  

    let promiseServices = this.servicesHandler.getServices();
    promiseServices.then((res) => {      
      this.services = res;          
    });                  

    let promiseSubservices = this.servicesHandler.getSubservices();
    promiseSubservices.then((res) => {      
      this.subservices = res;        
    });                  

    let promiseProfile = this.awsService.getPrestadoraProfile();
    promiseProfile.then((res : any) => {
      this.prestadoraServices = Array.from(Object.keys(res.body.priceTable));        
    });

    Promise.all([promiseProfile, promiseDetails, promiseServices, promiseSubservices]).then(() => {
        this.assembleList();
    });

  }   

  assembleList(){
    console.log('Assemble!');

    this.subservicesDetails = this.subservicesDetails.filter(function(value) {
      return this.prestadoraServices.includes(value.serviceDetail);
    }, this);
    
  }
}
