import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutes } from './Routes/auth-routes';
import { NotFoundPageComponent } from '../main/components/not-found-page/not-found-page.component';

const routes: Routes = [


  {
    path: '',
    redirectTo: AuthRoutes.login,
    pathMatch: 'full',
  },
  {
    path: AuthRoutes.login,
    component: LoginComponent,
  },

  {
    path: '**',
    component: NotFoundPageComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
