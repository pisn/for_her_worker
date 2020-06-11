import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';

import { IonicModule } from '@ionic/angular';

import { PictureCropperPage } from './picture-cropper.page';

const routes: Routes = [
  {
    path: '',
    component: PictureCropperPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ImageCropperModule
  ],
  declarations: [PictureCropperPage]
})
export class PictureCropperPageModule {}
