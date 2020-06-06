import { Injectable } from '@angular/core';
import {AwsApiConnectService} from './aws-api-connect.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ServicesHandlerService {

  constructor(private awsService: AwsApiConnectService) { }

  private _services: any;
  private _subservices: any;
  private _serviceDetails: any;

  getServices(){
    return new Promise<any>((resolve) => {
      if(this._services == null){
        console.log('Pedindo requisicao 1');
        return this.awsService.getServices().then((res: any) => {
          this._services = res.Items;
          resolve(res.Items);
        });
      }
      else {        
        console.log('Nao fazendo requisicao 1!');
        resolve(this._services);        
      }
    });
  }

  getSubservices(): Promise<any> {    
    return new Promise<any>((resolve) => {
      if(this._subservices == null){
        console.log('Pedindo requisicao 3');
        return this.awsService.getSubservices("All").then((res: any) => {
          this._subservices = res.Items;            
          resolve(res.Items);
        });
      }
      else {        
        console.log('Nao fazendo requisicao! 3');
        resolve(this._subservices);        
      }
    });
    
  }

  getSubserviceDetails():Promise<any> {
    return new Promise<any>((resolve) => {
      if(this._serviceDetails == null){
        console.log('Pedindo requisicao 2');
        return this.awsService.getSubservicesDetails("All").then((res: any) => {
          this._serviceDetails = res.Items;
          resolve(res.Items);
        });
      }
      else {        
        console.log('Nao fazendo requisicao! 2');
        resolve(this._serviceDetails);        
      }
    });    
  }
}
