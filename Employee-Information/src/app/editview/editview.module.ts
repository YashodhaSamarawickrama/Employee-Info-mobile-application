import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditviewPageRoutingModule } from './editview-routing.module';

import { EditviewPage } from './editview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditviewPageRoutingModule
  ],
  declarations: [EditviewPage]
})
export class EditviewPageModule {}
