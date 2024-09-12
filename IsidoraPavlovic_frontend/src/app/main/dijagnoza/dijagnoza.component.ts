import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DijagnozaService } from '../../services/dijagnoza.service';
import { MatTableDataSource } from '@angular/material/table';
import { Dijagnoza } from 'src/app/models/dijagnoza';
import { Subscription } from 'rxjs';
import { DijagnozaDialogComponent } from 'src/app/dialogs/dijagnoza-dialog/dijagnoza-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dijagnoza',
  templateUrl: './dijagnoza.component.html',
  styleUrls: ['./dijagnoza.component.css']
})
export class DijagnozaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource!:MatTableDataSource<Dijagnoza>;
  subscription!:Subscription;

  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;


  constructor (private service:DijagnozaService, public dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public loadData(){
    this.subscription = this.service.getAllDijagnoza().subscribe(
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

  public openDialog (flag:number, id?:number, naziv?:string, opis?:string, oznaka?:string) {
    const dialogRef = this.dialog.open (DijagnozaDialogComponent, {data: {id, naziv, opis, oznaka}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
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
