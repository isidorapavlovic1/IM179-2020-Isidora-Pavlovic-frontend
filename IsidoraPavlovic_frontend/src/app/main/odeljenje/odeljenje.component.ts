
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Odeljenje } from 'src/app/models/odeljenje';
import { BolnicaService } from '../../services/bolnica.service';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { OdeljenjeDialogComponent } from 'src/app/dialogs/odeljenje-dialog/odeljenje-dialog.component';
import { Bolnica } from 'src/app/models/bolnica';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-odeljenje',
  templateUrl: './odeljenje.component.html',
  styleUrls: ['./odeljenje.component.css']
})
export class OdeljenjeComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'naziv', 'lokacija', 'bolnica', 'actions'];
  dataSource!:MatTableDataSource<Odeljenje>;
  subscription!:Subscription;
  parentSelectedOdeljenje!:Odeljenje;

  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor (private service:OdeljenjeService, public dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  public selectRow (row:Odeljenje){
    this.parentSelectedOdeljenje = row;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.subscription = this.service.getAllOdeljenje().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error:Error) =>{
      console.log (error.name + ' ' + error.message);
    }
    
  }

  public openDialog (flag:number, id?:number, naziv?: string, lokacija?: string, bolnica?:Bolnica){
    const dialogRef = this.dialog.open(OdeljenjeDialogComponent, {data: {id, naziv, lokacija, bolnica}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed ().subscribe (
      (result) => {
        if (result==1){
          this.loadData();
      }
    }
    )
  }

  public applyFilter(filter:any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
}
