import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { LivechatComponent } from './livechat/livechat.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account', component:AccountComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'livechat', component:LivechatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})], //,
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
