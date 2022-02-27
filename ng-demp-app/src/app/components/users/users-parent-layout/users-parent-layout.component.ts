import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { UsersTableComponent } from '../users-table/users-table.component';
import { IUsers, IWebsiteType } from 'src/app/interfaces/iusers';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-parent-layout',
  templateUrl: './users-parent-layout.component.html',
  styleUrls: ['./users-parent-layout.component.scss']
})
export class UsersParentLayoutComponent implements OnInit, OnDestroy {

  @ViewChild(EditUserFormComponent, { static: false }) childFormComp!: EditUserFormComponent;
  @ViewChild(UsersTableComponent, { static: false }) childTableComp!: UsersTableComponent;

  private subs = new Subscription();
  public toggleShowEditForm: boolean = false;
  public tableData: any;
  public isDataLoaded: boolean = false;
  private newTableData: any = [];

  appTypes: IWebsiteType[] =
  [{ value: "1", viewValue: "Singer" },
  { value: "2", viewValue: "Bassist" },
  { value: "3", viewValue: "Guitarist" },
  { value: "4", viewValue: "Drummer" }];

  constructor(private userSVC: UsersService, private _snackBar: MatSnackBar) { }

  //* Initialize
  ngOnInit(): void {
    // this.tableData = ELEMENT_DATA;
    this.isDataLoaded = false;
    this.subs.add(this.userSVC.getAllUsers().subscribe((response) => {
      console.log(response)
      this.tableData = response.data;
      this.isDataLoaded = true;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }


  // ********************************************************** */
  // D E S T R O Y
  // ********************************************************** */

  ngOnDestroy() {

    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  //* Called by User Table Component to select a record and sends the record id to the Edit User Form Component
  public onEditRecord(id: any): void {
    //* Render the edit form and hide the add form
    this.toggleShowEditForm = true;

    //* Delay so the edit form can render first before calling the openRecord() function in the component
    setTimeout(() => {
      this.childFormComp.openRecord(id);
    }, 300);

  }


  //* Called by User Form Component to save the changes and reload the User Table Component with the new data
  public onSaveChangeToRecord(record: any) {

    this.subs.add(this.userSVC.getAllUsers().subscribe((response) => {
      this.tableData = response.data;
      this.isDataLoaded = true;
      this.childTableComp.onLoadData(this.tableData);
      this._snackBar.open('Record Saved', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });

    },
    (err: HttpErrorResponse) => {
      console.log(err);
      this._snackBar.open('Error', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }));


    //* Hide the edit form and render the add form
    this.toggleShowEditForm = false;
  }

  //* Called by Add User Form Component to save the changes and reload the User Table Component with the new data
  public onAddNewRecord(record: any) {
    this.isDataLoaded = false;
    this.subs.add(this.userSVC.getAllUsers().subscribe((response) => {
      this.tableData = response.data;
      this.isDataLoaded = true;
      this.childTableComp.onLoadData(this.tableData);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

  }

}


// const ELEMENT_DATA: IUsers[] = [
//   {id: 0, name: 'Eddie Van Halen', description: 'Lead Guitar for Van Halen',    email: 'eddiev@email.com',     type: 3},
//   {id: 1, name: 'Joe Satriani',    description: 'Lead Guitar for Joe Satriani',    email: 'joe@email.com',     type: 3},
//   {id: 2, name: 'Dave Mathews',    description: 'Singer Guitarist for Dave Mathews',    email: 'dave@email.com',    type: 1},
//   {id: 3, name: 'Sandy Saraya',    description: 'Lead singer of Saraya',    email: 'saraya@email.com', type: 3},
//   {id: 4, name: 'Rosy Tedjedor',   description: 'Singer of Kittens',    email: 'rosy@email.com',    type: 2},
//   {id: 6, name: 'Aaron Spears',    description: 'Gospil Drumer',    email: 'aaron@email.com',   type: 3},
//   {id: 7, name: 'Neil Piert',      description: 'Drummer for Rush',    email: 'neil@email.com',    type: 3},
//   {id: 8, name: 'Geddy Lee',       description: 'Bassist for Rush',    email: 'geddy@email.com',   type: 2},
//   {id: 9, name: 'Alex Lifeson',    description: 'Lead Guitarist for Rush',    email: 'alex@email.com',    type: 1},
//   {id: 10, name: 'Jeff Pacaro',    description: 'Original Drumer for Totto',    email: 'jeff@email.com',    type: 3},
// ];
