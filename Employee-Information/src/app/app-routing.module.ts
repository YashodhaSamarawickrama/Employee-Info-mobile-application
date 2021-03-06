import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'listview',
    loadChildren: () => import('./listview/listview.module').then( m => m.ListviewPageModule)
  },
  {
    path: 'detailview',
    loadChildren: () => import('./detailview/detailview.module').then( m => m.DetailviewPageModule)
  },
  {
    path: 'editview',
    loadChildren: () => import('./editview/editview.module').then( m => m.EditviewPageModule)
  },
  {
    path: 'addnew',
    loadChildren: () => import('./addnew/addnew.module').then( m => m.AddnewPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
