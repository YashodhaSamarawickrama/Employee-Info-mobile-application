import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditviewPage } from './editview.page';

const routes: Routes = [
  {
    path: '',
    component: EditviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditviewPageRoutingModule {}
