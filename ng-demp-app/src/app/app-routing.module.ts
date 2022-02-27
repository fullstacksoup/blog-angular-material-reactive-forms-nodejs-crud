import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersParentLayoutComponent } from './components/users/users-parent-layout/users-parent-layout.component';
const routes: Routes = [
  {
    path: '',
    component: UsersParentLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
