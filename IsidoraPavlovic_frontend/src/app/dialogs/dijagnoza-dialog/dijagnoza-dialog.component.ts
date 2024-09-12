import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dijagnoza } from 'src/app/models/dijagnoza';
import { DijagnozaService } from 'src/app/services/dijagnoza.service';

@Component({
  selector: 'app-dijagnoza-dialog',
  templateUrl: './dijagnoza-dialog.component.html',
  styleUrls: ['./dijagnoza-dialog.component.css']
})
export class DijagnozaDialogComponent {
  flag!:number;

  constructor (
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Dijagnoza>,
    @Inject (MAT_DIALOG_DATA) public data: Dijagnoza,
    public service: DijagnozaService
  ) { }

  public add() {
    this.service.addDijagnoza(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Artikl sa nazivom ${data.naziv} je uspešno dodat`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(`Neuspešno dodavanje!`, "Zatvori", {duration: 3500});
    }
  }

  public update (){
    this.service.updateDijagnoza (this.data).subscribe(
      (data) =>{
        this.snackBar.open (`Dijagnoza sa id ${data.id} je uspešno ažurirana`, "U redu", {duration:3500});
      }
    ),
    (error: Error) => {
      console.log (error.name + ' '+ error.message);
      this.snackBar.open(`Neuspešno ažuriranje!`, "Zatvori", {duration: 3500});
    }
  }

  public delete (){
    this.service.deleteDijagnoza(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`Dijagnoza je uspešno obrisana`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno brisanje!`, "Zatvori", {duration: 3500});
    }
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmene!`, "Zatvori", {duration: 3500});
  }
  
}
