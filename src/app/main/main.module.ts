import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LoaderComponent } from './components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormModelComponent } from './components/form-model/form-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './components/users/state/user.effects';
import { UsersComponent } from './components/users/users.component';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { NavComponent } from './components/home/nav/nav.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    HomeComponent,
    LoaderComponent,
    FormModelComponent,
    UsersComponent,
    AdminRoleComponent,
    NavComponent,
    UserDetailsComponent,
    NotFoundPageComponent
  ],
  imports: [
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
})
export class MainModule { }
