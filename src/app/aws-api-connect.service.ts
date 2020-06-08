import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { CognitoServiceService } from './cognito-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';
import * as aws from 'aws-sdk';
import {Buffer} from 'buffer';

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

  uploadPictureToS3(image, imageName){
    return new Promise((resolve, reject) => {    
      let base64Image = 'data:image/jpeg;base64,' + image;
      
      const body = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      aws.config.region = 'ca-central-1';
          aws.config.credentials = new aws.Credentials({
            accessKeyId:  "AKIATSVHE7R5WYSRPDKR",
            secretAccessKey: "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"
      });
  
      var s3 = new aws.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: "forher-prestadora-profilepictures" }
      }); 
      
  
      var data = {
        Bucket: "forher-prestadora-profilepictures",
        Key: imageName,
        Body: body,
        ContentEncoding: "base64",
        ContentType: "image/jpeg"
      };

      
  
      s3.putObject(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
