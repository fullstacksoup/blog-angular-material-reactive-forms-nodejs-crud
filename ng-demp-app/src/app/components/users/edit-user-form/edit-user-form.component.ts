import { Component, OnInit, OnDestroy, EventEmitter, Output, Input  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUsers, IWebsiteType } from 'src/app/interfaces/iusers';
import { HttpErrorResponse } from '@angular/common/http';
import { UserClass } from 'src/app/models/user-class';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit, OnDestroy {
  public data: any;
  @Input() pageDetails: any;
  @Input() tableData: IUsers[] = [];
  @Output() showMessage = new EventEmitter<boolean>();
  @Output() saveChangeToRecord = new EventEmitter<boolean>();

  private subs = new Subscription();
  private newUserCls = new UserClass();

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public matcher = new MyErrorStateMatcher();
  public nameArray: any;
  public overlapPageArray: any;
  public toNameArray: any;
  public fromNameArray: any;
  public nameSearchArray: any;
  public hasUnitNumber = false;
  public eventForm = new FormGroup({})
  public isActive = new FormControl('', [Validators.required]);
  public appCategory = new FormControl('', [Validators.required]);

  states = {};

  appTypes: IWebsiteType[] =
    [{ value: "1", viewValue: "Singer" },
    { value: "2", viewValue: "Bassist" },
    { value: "3", viewValue: "Guitarist" },
    { value: "4", viewValue: "Drummer" }];

  // constructor(private fb: FormBuilder, private usersSVC: UsersService) { }
  constructor(private fb: FormBuilder, private userSVC: UsersService) { }


 // ********************************************************** */
  // I N I T
  // ********************************************************** */

  ngOnInit() {

    this.toNameArray = [];
    this.fromNameArray = [];
    this.showMessage.emit(false);

    this.eventForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    });

    this.appCategory = new FormControl(0);

  }

  // ********************************************************** */
  // D E S T R O Y
  // ********************************************************** */

  ngOnDestroy() {

    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  // ********************************************************** */
  // GET ELEMENT FOR APPLICATION CATEGORY
  // ********************************************************** */


  getApplicationID(value: any): number {
    var appVal = 0;
    var counter = 0;
    this.appTypes.forEach(item => {
      if (item.value == value) {
        appVal = counter;
      }
      counter++;
    })
    return appVal;
  }


  //* Open record called from the Parent Layout Component

  openRecord(id: any): void {
    //* This is where you would use a service call to get a single record
    this.subs.add(this.userSVC.getSingleUser(id).subscribe((response) => {
      console.log(response)
      var record = response.data[0];
      this.eventForm = this.fb.group({
        id: [record.Id],
        name: [record.Name, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        email: [record.Email, [Validators.required, Validators.email]],
        description: [record.Description, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      });
      this.appCategory = new FormControl(this.appTypes[this.getApplicationID(record.Category)].value);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

  }


  //* Submit Form to Parent Layout Component

  onSubmit($event: any) {


    this.newUserCls.Id = this.eventForm.controls.id.value;
    this.newUserCls.Name = this.eventForm.controls.name.value;
    this.newUserCls.Email = this.eventForm.controls.email.value;
    this.newUserCls.Description = this.eventForm.controls.description.value;
    this.newUserCls.Category = this.appCategory.value;
    console.log(this.newUserCls)
    this.subs.add(this.userSVC.updateSingleUser(this.newUserCls).subscribe((response) => {
      console.log(response)
      this.saveChangeToRecord.emit(true)
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

  }
}

