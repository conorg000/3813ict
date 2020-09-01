import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{path: 'login', component: LoginComponent}, {path: 'account', component:AccountComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
