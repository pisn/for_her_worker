import { Component, OnInit } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  name: string;
  rating: number;

  constructor(private cognitoService: CognitoServiceService) { }



  ngOnInit() {
    
    this.name = this.cognitoService.userName;
    this.rating = 4.8;
  }

}
