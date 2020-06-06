import { Injectable } from '@angular/core';
import {AwsApiConnectService} from './aws-api-connect.service';

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
        return this.awsService.getServices().then((res: any) => {
          this._services = res.Items;
          resolve(res.Items);
        });
      }
      else {                
        resolve(this._services);        
      }
    });
  }

  getSubservices(): Promise<any> {    
    return new Promise<any>((resolve) => {
      if(this._subservices == null){        
        return this.awsService.getSubservices("All").then((res: any) => {
          this._subservices = res.Items;            
          resolve(res.Items);
        });
      }
      else {                
        resolve(this._subservices);        
      }
    });
    
  }

  getSubserviceDetails():Promise<any> {
    return new Promise<any>((resolve) => {
      if(this._serviceDetails == null){        
        return this.awsService.getSubservicesDetails("All").then((res: any) => {
          this._serviceDetails = res.Items;
          resolve(res.Items);
        });
      }
      else {                
        resolve(this._serviceDetails);        
      }
    });    
  }
}
