import { Component, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/main/services/loader.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { user } from 'src/app/main/models/user.model';
import { GlobalService } from 'src/app/main/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { LangService } from 'src/app/services/lang.service';
import { FormModelComponent } from 'src/app/main/components/form-model/form-model.component';
import { Router } from '@angular/router';
import { Routing } from 'src/app/Routes/app-routes';
@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent {
  loading: boolean = true
  allUsers: user[] = []
  Users: user[] = []
  total!: number
  page = 1
  lang!: string
  displayedColumns: string[] = ['id', 'name', 'user-name', 'email', 'phone', 'website', 'actions'];
  dataSource!: MatTableDataSource<user>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _Router: Router, public _LangService: LangService, public loaderService: LoaderService, private _GlobalService: GlobalService, public dialog: MatDialog) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this._LangService.lang.subscribe((res) => {
      this.lang = res
    })
    //all Users and make paginate over all Users
    this._GlobalService.users.subscribe((res) => {
      if (res) {
        this.allUsers = this._GlobalService.users.getValue()
        console.log(this.allUsers);

        this.total = (this.allUsers.length) / 5
        this.paginate(this.allUsers, 5, 1);
      }
    })
  }
  //paginate function 
  paginate(data: user[], itemsPerPage: number, currentPage: number) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.Users = data.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource(this.Users);
    return this.dataSource
  }

  //search function for Users
  applyFilter(event: any) {
    let filter = event.value
    this.dataSource.filter = filter.trim().toLowerCase();
    this.total = this.dataSource.filteredData.length / 5
  }
  //update function to open modal of product
  update(id: number) {
    this.openDialog(id, 'updateUser')
  }

  //delete user
  Delete(id: number) {
    this.openDialog(id, 'deleteUser')

  }
  //add user
  add() {
    this.openDialog(0, 'addUser')
  }

  //next page of Users
  next() {
    if (this.page < this.total) {
      this.page++
      this.paginate(this.allUsers, 5, this.page)
    }

  }

  //prev page of Users
  prev() {
    if (this.page > 1) {
      this.page--
      this.paginate(this.allUsers, 5, this.page)
    }
  }
  //open modal
  openDialog(id: number, type: string) {
    const dialogRef = this.dialog.open(FormModelComponent, {
      data: { id, type }, width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  show(id: number) {
    this._Router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.userDetails}/${id}`])
  }
}
