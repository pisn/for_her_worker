import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { CognitoServiceService } from './cognito-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AwsApiConnectService {

  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/';        

  constructor(private httpService : HttpService, private cognitoService : CognitoServiceService) { }

  getPrestadorasBySubservice(serviceDetails: Array<string>){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "prestadorasbysubservice?serviceDetails=" + JSON.stringify(serviceDetails),requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  getOrdersByUser(){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "serviceorderbyuser?userId=" + this.cognitoService.getUserId())
              .subscribe((result: any) => {                   
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  setNewServiceOrder(prestadora: any, subservices : Array<string>, chosenDate : Date, chosenTime: string, details: string, location: Array<any>){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              

      var prestadoraFiltered = {
        coordinates: prestadora.coordinates,
        distance: prestadora.distance,
        distancePrice : Number.parseFloat(prestadora.distancePrice.toFixed(2)),        
        freeDistance: prestadora.freeDistance,
        kilometerPrice : prestadora.kilometerPrice,
        nome: prestadora.nome,
        prestadoraId: prestadora.prestadoraId
      }

      var requestBody = {
          table: "serviceOrders",
          item: {
            userId: this.cognitoService.getUserId(),            
            location: location,
            chosenSubservices: subservices,            
            chosenDate : chosenDate,
            chosenTime : chosenTime,
            prestadora: prestadoraFiltered,            
            details : details,             
            status: "Em Aberto"            
          }
      };
      
      console.log(JSON.stringify(requestBody).toString());

      this.httpService.getHttpClient().post(this.API_URL + "serviceorder", JSON.stringify(requestBody),requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }
}
