import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { IUsers, IWebsiteType } from 'src/app/interfaces/iusers';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input() tableData: any;
  @Output() editRecord = new EventEmitter<number>();

  public dataSource: any;
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Description', 'Category'];


  constructor() { }

//* Initialize
  ngOnInit(): void {
    console.log('this.tableData', this.tableData)
    this.dataSource = this.tableData;
  }

//* Emits to Parent Layout Component that a record has been chosen
  public onEditForm(id: any) {
    // console.log(id);
    this.editRecord.emit(id);
  }

//* Called on by Parent Layout Component when the User Form Component submits a change
  public onLoadData(data: any) {
    this.dataSource = data;
  }
}
