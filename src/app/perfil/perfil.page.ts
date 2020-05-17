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

  showLevel1: any;
  showLevel2: any;

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

    this.subservicesDetails = this.subservicesDetails.filter(function(value) {
      return this.prestadoraServices.includes(value.serviceDetail);
    }, this);

    
    this.subservices = this.subservices.filter(function(value) {
        return this.includes(value.subservice)
    },this.subservicesDetails.map(function(item) {return item.subservice}));
    

    this.services = this.services.filter(function(value) {
      return this.includes(value.service)
    }, this.subservices.map(function(item) {return item.service}));      
  }

  getSubservices(service){
    console.log("Running for:" + service)
    return this.subservices.filter(function(value) {
      return value.service == this;
    },service.service);
  }

  getSubserviceDetails(subservice){
    return this.subservicesDetails.filter(function(value) {
      return value.subservice == this;
    }, subservice.subservice);

  }

  toggleLevel1(idx) {    
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {    
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

}
