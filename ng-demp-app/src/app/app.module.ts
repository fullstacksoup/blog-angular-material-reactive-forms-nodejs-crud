import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserFormComponent } from './components/users/edit-user-form/edit-user-form.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UsersService } from './services/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { UsersParentLayoutComponent } from './components/users/users-parent-layout/users-parent-layout.component';
import { AngularFormDemoComponent } from './components/form-demo/angular-form-demo/angular-form-demo.component';
import { AddUserFormComponent } from './components/users/add-user-form/add-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserFormComponent,
    UsersTableComponent,
    MainLayoutComponent,
    UsersParentLayoutComponent,
    AngularFormDemoComponent,
    AddUserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,    
    FormsModule,
    MaterialModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
