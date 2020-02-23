import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailviewPage } from './detailview.page';

const routes: Routes = [
  {
    path: '',
    component: DetailviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailviewPageRoutingModule {}
