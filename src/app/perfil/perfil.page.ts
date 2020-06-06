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
  subservicesShow: Array<any>;
  services:Array<any>;
  servicesShow:Array<any>;
  subservicesDetails:Array<any>;
  subservicesDetailsShow:Array<any>; //Filtrado para prestados 
  prestadoraServices: Array<string>;
  assembledServiceList: Array<any>;
  
  editValuesMode: boolean;
  showLevel1: any;
  showLevel2: any;

  constructor(private cognitoService: CognitoServiceService, private awsService : AwsApiConnectService, private modalCtrl: ModalController, private alertController: AlertController, private servicesHandler : ServicesHandlerService) { }

  ngOnInit() {
    this.cpf = this.cognitoService.userAttributes['custom:cpf'];
    this.editValuesMode = false;
    
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

    if(!this.editValuesMode){ //Filtrar por subserviços que a prestadora de fato presta
      this.subservicesDetailsShow = this.subservicesDetails.filter(function(value) {
        return this.prestadoraServices.includes(value.serviceDetail);
      }, this);
    }     
    else {
      this.subservicesDetailsShow = this.subservicesDetails;
    }

    //Trazendo subservicos associados aos serviceDetails puxados
    this.subservicesShow = this.subservices.filter(function(value) {
        return this.includes(value.subservice)
    },this.subservicesDetailsShow.map(function(item) {return item.subservice}));
    
    //trazendo os servicos associados aos subservicos puxados
    this.servicesShow = this.services.filter(function(value) {
      return this.includes(value.service)
    }, this.subservicesShow.map(function(item) {return item.service}));      
  }

  //Trazer subservices associados ao servico (param)
  getSubservices(service){
    console.log("Running for:" + service)
    return this.subservicesShow.filter(function(value) {
      return value.service == this;
    },service.service);
  }

  //Trazer subserviceDetails associados ao subservice(param)
  getSubserviceDetails(subservice){
    return this.subservicesDetailsShow.filter(function(value) {
      return value.subservice == this;
    }, subservice.subservice);

  }

  //Abrir primeiro nivel da lista sanfonada
  toggleLevel1(idx) {    
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  

  //Abrir segundo nivel da lista sanfonada
  toggleLevel2(idx) {    
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  toogleEditValuesMode(){
    this.editValuesMode = !this.editValuesMode;
    this.assembleList();
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

  falseTest(event) {
    event.stopPropagation();
  }

}
