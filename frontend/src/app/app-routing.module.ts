import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    'redirectTo': 'folder/Home',
  },
  {
    path: 'folder/Admin',
    redirectTo: 'folder/Products',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./user/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./user/category/category.module').then(m => m.CategoryPageModule)
  },
  {
    path: 'admin/category',
    loadChildren: () => import('./admin/category/category.module').then(m => m.CategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
