import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { CognitoServiceService } from './cognito-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';
import * as aws from 'aws-sdk';

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
      
      this.httpService.getHttpClient().get(this.API_URL + "serviceorderbyprestadora", requestOptions)
              .subscribe((result: any) => {                   
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  getSubservicesDetails(subservice){    

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "subservicedetails?subservice=" + subservice,requestOptions)
              .subscribe((result: any) => {                                                
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });     
      });
  }

  getSubservices(service){    

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "subservices?service=" + service,requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
      });
  }

  updateServiceOrder(order: any){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              

     var requestBody = {                    
          order
      };
      
      console.log(JSON.stringify(requestBody).toString());

      this.httpService.getHttpClient().post(this.API_URL + "setserviceorderprestadora", JSON.stringify(requestBody),requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  insertToTable(table: string, item: any){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                    

      var requestBody = {
          table: table,
          item: item
      };
      
      console.log(JSON.stringify(requestBody).toString());

      this.httpService.getHttpClient().post(this.API_URL + "insertapi", JSON.stringify(requestBody),requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  getServices(){    

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "services",requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
   });
  }

  getPrestadoraProfile(){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                               
      

      this.httpService.getHttpClient().get(this.API_URL + "prestadoraprofile", requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }


  newPrestadoraProfile(prestadoraProfile){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                               
      

      this.httpService.getHttpClient().post(this.API_URL + "prestadoraprofile", {"prestadora" : prestadoraProfile} ,requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  updatePrestadorasServiceList(serviceList) {
    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                               
      
      var bodyServiceList = {};

      serviceList.forEach(element => { //Num primeiro momento, consideraremos a pricetable 0.
        bodyServiceList[element] = 0;
      });

      var body = {
        subserviceDetailsList : bodyServiceList
      };

      this.httpService.getHttpClient().post(this.API_URL + "prestadoraprofile", body, requestOptions)
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
