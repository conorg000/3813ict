import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LivechatComponent } from './livechat/livechat.component';
import { ManageComponent } from './manage/manage.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'livechat', component:LivechatComponent},
  {path: 'manage', component:ManageComponent},
  {path: 'update', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
