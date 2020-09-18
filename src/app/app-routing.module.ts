import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  RoboComponent } from './views/robo/robo.component';


const routes: Routes = [

  { 
    path: '', 
    redirectTo: 'robo', 
    pathMatch: 'full' 
  },
  {
    path: 'robo',
    component: RoboComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
