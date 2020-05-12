import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';
import {AwsApiConnectService} from '../aws-api-connect.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cpf: string;
  subserviceDetails: Array<any>;  

  constructor(private cognitoService: CognitoServiceService, private awsService : AwsApiConnectService) { }

  ngOnInit() {
    this.cpf = this.cognitoService.userAttributes['custom:cpf'];

    this.awsService.getSubservices("All").then((result: any) => {
      this.subserviceDetails = result.Items;      
      
    });
  }  
}
