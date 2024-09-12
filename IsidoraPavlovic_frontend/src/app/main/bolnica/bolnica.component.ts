import { BolnicaDialogComponent } from 'src/app/dialogs/bolnica-dialog/bolnica-dialog.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Bolnica } from 'src/app/models/bolnica';
import { BolnicaService } from '../../services/bolnica.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-bolnica',
  templateUrl: './bolnica.component.html',
  styleUrls: ['./bolnica.component.css']
})
export class BolnicaComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'naziv', 'adresa', 'budzet', 'actions'];
  dataSource!:MatTableDataSource<Bolnica>;
  subscription!:Subscription;

  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor (private service:BolnicaService, public dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public loadData(){
    this.subscription = this.service.getAllBolnica().subscribe(
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

  public openDialog (flag:number, id?:number, naziv?:string, budzet?:number){
    const dialogRef = this.dialog.open (BolnicaDialogComponent, {data:{id, naziv, budzet}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      (result) => {
        (result ==1)
          this.loadData();
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
