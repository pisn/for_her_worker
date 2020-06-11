import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-picture-cropper',
  templateUrl: './picture-cropper.page.html',
  styleUrls: ['./picture-cropper.page.scss'],
})
export class PictureCropperPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
    
  }

  imageBase64: any;
  croppedImage: any = '';
  
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;      
  }
  imageLoaded() {
      // show cropper       
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  returnResult() {
    this.modalController.dismiss(this.croppedImage);
  }

}
