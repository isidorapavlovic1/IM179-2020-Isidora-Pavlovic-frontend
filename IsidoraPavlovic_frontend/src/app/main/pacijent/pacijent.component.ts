import { PacijentService } from 'src/app/services/pacijent.service';
import { Component, OnInit, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pacijent } from 'src/app/models/pacijent';
import { Odeljenje } from 'src/app/models/odeljenje';
import { Dijagnoza } from 'src/app/models/dijagnoza';
import { PacijentDialogComponent } from 'src/app/dialogs/pacijent-dialog/pacijent-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnChanges {
  displayedColumns = ['id', 'ime', 'prezime', 'zdr_osiguranje', 'datum_rodjenja', 'odeljenje', 'dijagnoza', 'actions'];
  dataSource!:MatTableDataSource<Pacijent>;
  subscription!:Subscription;

  @Input() childSelectedOdeljenje!:Odeljenje;

  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  


  constructor (private service:PacijentService, public dialog:MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public loadData(){
    this.subscription = this.service.getPacijentByOdeljenje(this.childSelectedOdeljenje.id).subscribe(
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

  public openDialog (flag:number, id?:number, ime?:string, prezime?:string, zdr_osiguranje?:boolean, 
    datum_rodjenja?:Date, odeljenje?:Odeljenje, dijagnoza?:Dijagnoza){
      const dialogRef = this.dialog.open (PacijentDialogComponent, {data :{ id, ime, prezime, zdr_osiguranje, datum_rodjenja, odeljenje, dijagnoza}});
      dialogRef.componentInstance.flag = flag;
      dialogRef.componentInstance.data.odeljenje = this.childSelectedOdeljenje;
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
