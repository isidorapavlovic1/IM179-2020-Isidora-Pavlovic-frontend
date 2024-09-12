import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bolnica } from 'src/app/models/bolnica';
import { Odeljenje } from 'src/app/models/odeljenje';
import { BolnicaService } from 'src/app/services/bolnica.service';
import { OdeljenjeService } from 'src/app/services/odeljenje.service';

@Component({
  selector: 'app-odeljenje-dialog',
  templateUrl: './odeljenje-dialog.component.html',
  styleUrls: ['./odeljenje-dialog.component.css']
})
export class OdeljenjeDialogComponent implements OnInit {
  flag!:number;
  bolnicas!:Bolnica[];

  constructor(
    public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<Odeljenje>,
    @Inject (MAT_DIALOG_DATA) public data: Odeljenje,
    public service: OdeljenjeService,
    public bolnicaService:BolnicaService
  ){ }

  ngOnInit(): void {
    this.bolnicaService.getAllBolnica().subscribe(
      (data) => {
        this.bolnicas = data;
      }
    )
  }

  public compare (a:any, b:any){
    return a.id == b.id;
  }

  public add(){
    this.service.addOdeljenje (this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno dodato odeljenje sa ID: ${data.id}`, `U redu`,
          {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno dodavanje`, `U redu`, {duration: 2500});
  }
}
  public update (){
    this.service.updateOdeljenje (this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno ažurirano odeljenje sa ID: ${data.id}`, `U redu`,
          {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno ažuriranje`, `U redu`, {duration: 2500});
  }
  }

  public delete (){
    this.service.deleteOdeljenje(this.data.id).subscribe (
      (data) => {
        this.snackBar.open(`Uspešno brisanje`, `U redu`, {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno brisanje`, `U redu`, {duration: 2500});
  }
}
  public cancel() {
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmena`, `U redu`, {duration: 2500});
}
}
