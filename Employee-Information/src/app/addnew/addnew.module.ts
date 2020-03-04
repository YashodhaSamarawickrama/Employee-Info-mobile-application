import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewPageRoutingModule } from './addnew-routing.module';

import { AddnewPage } from './addnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewPageRoutingModule
  ],
  declarations: [AddnewPage]
})
export class AddnewPageModule {}
