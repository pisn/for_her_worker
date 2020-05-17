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
      if(this._serviceDetails == null){
        console.log('Pedindo requisicao');
        return this.awsService.getServices().then((res: any) => {
          this._serviceDetails = res.Items;
          resolve(res.Items);
        });
      }
      else {        
        console.log('Nao fazendo requisicao!');
        resolve(this._serviceDetails);        
      }
    });
  }

  getSubservices(): Promise<any> {
    if(this._subservices == null){
      return new Promise<any>((resolve) => {
        if(this._serviceDetails == null){
          console.log('Pedindo requisicao');
          return this.awsService.getSubservices("All").then((res: any) => {
            this._serviceDetails = res.Items;
            resolve(res.Items);
          });
        }
        else {        
          console.log('Nao fazendo requisicao!');
          resolve(this._serviceDetails);        
        }
      });
    }
  }

  getSubserviceDetails():Promise<any> {
    return new Promise<any>((resolve) => {
      if(this._serviceDetails == null){
        console.log('Pedindo requisicao');
        return this.awsService.getSubservicesDetails("All").then((res: any) => {
          this._serviceDetails = res.Items;
          resolve(res.Items);
        });
      }
      else {        
        console.log('Nao fazendo requisicao!');
        resolve(this._serviceDetails);        
      }
    });    
  }
}
