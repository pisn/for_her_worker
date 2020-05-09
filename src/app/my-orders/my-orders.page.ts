import { Component, OnInit } from '@angular/core';
import {AwsApiConnectService} from '../aws-api-connect.service';
import {CommonUtilsService} from '../common-utils.service';
import {Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  orders: Array<any>;

  constructor(private router: Router, private awsApi: AwsApiConnectService, private utils: CommonUtilsService) { }

  ngOnInit() {
    this.awsApi.getOrdersByUser().then((result: any) => {        
        this.orders = this.processOrders(result.Items);
    },
    (error: any) => {
        console.log('Error obtaining orders by user:' + error.toString());
    });

  }


  processOrders(orders: Array<any>){
    orders.forEach(d => {
      d.totalPrice = 0;

      if(d.prestadora.distancePrice != null){
        d.totalPrice = d.prestadora.distancePrice;
      }

      d.chosenSubservices.forEach(serv => {        
        d.totalPrice = d.totalPrice + serv.price;        
      });

    });

    return orders;
  }

  formatPrices(price: number){
      return this.utils.formatPreco(price);      
  }

  formatStatus(status: string){
    switch(status){
      case "Em Aberto":
        return 'green';       
      default:
        return 'black';
    }
  }

  openOrderDetails(order){

    let extras : NavigationExtras = {
      state : {
        order: order        
      }
    };
    
    this.router.navigate(['order-details'], extras);    
  }

}
