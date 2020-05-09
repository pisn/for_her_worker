import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GeneralUtilitiesModule { 
  static pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }  

}



