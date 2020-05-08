import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'main',
  component: MainComponent
},
{
  path: "",
  redirectTo: "login",
  pathMatch: "full"
},
{
  path: "**",
  component: NotfoundComponent
}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
