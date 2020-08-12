import { Component, OnInit } from '@angular/core';
import {CommonUtilsService} from '../common-utils.service';
import {Router, NavigationExtras} from '@angular/router';
import { AwsApiConnectService } from '../aws-api-connect.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: any;  
  
  constructor(private router : Router, private utils: CommonUtilsService, private awsApiConnectService: AwsApiConnectService) { }

  ngOnInit() {    
    this.order = this.router.getCurrentNavigation().extras.state.order;    

    this.order.totalPrice = 0;
    if(this.order.prestadora.distancePrice > 0){
      this.order.totalPrice += this.order.prestadora.distancePrice;
    }    

    this.order.chosenSubservices.forEach(element => {
      this.order.totalPrice += element.price;
    });

  }

  convertedDistance(distance){
    return this.utils.convertedDistance(distance);
  }

  formatPreco(preco){
    return this.utils.formatPreco(preco);
  }

  formatStatus(status: string){
    switch(status){
      case "Em Aberto":
        return 'green';       
      default:
        return 'black';
    }
  }

  openChat(order){
    let extras : NavigationExtras = {
      state : {               
        order : this.order      
      }
    };
    
    this.router.navigate(['chat-mana'], extras);
  }

  acceptOrder(order) {
    order.status = "Agendado";
    delete order.profilePicture;
    this.awsApiConnectService.updateServiceOrder(order);
  }
  

}
