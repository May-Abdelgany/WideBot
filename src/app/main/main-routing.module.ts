import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRoutes } from './Routes/main-routes';
import { HomeComponent } from './components/home/home.component';

import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RoleGuard } from '../guard/role.guard';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: MainRoutes.home,
    pathMatch: 'full',
  },
  {
    path: MainRoutes.home,
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: MainRoutes.users,
        pathMatch: 'full',
      },
      {
        path: MainRoutes.users,
        canActivate: [RoleGuard],
        component: UsersComponent,
      },
      {
        path: `${MainRoutes.userDetails}/:id`,
        component: UserDetailsComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
