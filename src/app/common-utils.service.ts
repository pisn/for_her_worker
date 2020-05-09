import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor() { }


  formatPreco(preco:number): string{
    let numberFormat : Intl.NumberFormatOptions = {
      style : "currency",
      currency : "BRL"
    };

    return preco.toLocaleString("pt-BR",numberFormat);
  }

  convertedDistance(distance: number): string{
    if(distance < 1000){
      return Math.round(distance).toString() + " m";
    }
    else {
      return (distance/1000).toFixed(2).toString() + " Km";
    }
    
  }
}
