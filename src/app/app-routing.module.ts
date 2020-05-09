import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }, 
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'reset-password/:userEmail', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },    
  { path: 'my-orders', loadChildren: './my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },  
  { path: 'location-select', loadChildren: './location-select/location-select.module#LocationSelectPageModule' },
  { path: 'chat-mana', loadChildren: './chat-mana/chat-mana.module#ChatManaPageModule' },
  { path: 'order-details', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
