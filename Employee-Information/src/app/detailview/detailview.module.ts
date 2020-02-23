import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailviewPageRoutingModule } from './detailview-routing.module';

import { DetailviewPage } from './detailview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailviewPageRoutingModule
  ],
  declarations: [DetailviewPage]
})
export class DetailviewPageModule {}
