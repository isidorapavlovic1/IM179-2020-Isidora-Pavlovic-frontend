import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bolnica } from 'src/app/models/bolnica';
import { BolnicaService } from 'src/app/services/bolnica.service';

@Component({
  selector: 'app-bolnica-dialog',
  templateUrl: './bolnica-dialog.component.html',
  styleUrls: ['./bolnica-dialog.component.css']
})
export class BolnicaDialogComponent {
  flag!:number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Bolnica>,
    @Inject (MAT_DIALOG_DATA) public data: Bolnica,
    public service: BolnicaService
  ) {  }

  public add() {
    this.service.addBolnica(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Bolnica sa nazivom ${data.naziv} je uspešno dodata`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(`Neuspešno dodavanje!`, "Zatvori", {duration: 3500});
    }
  }

  public update() {
    this.service.updateBolnica(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Bolnica sa id ${data.id} je uspešno ažurirana`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno ažuriranje!`, "Zatvori", {duration: 3500});
    }
  }

  public delete() {
    this.service.deleteBolnica(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`Bolnica je uspešno obrisana`, "U redu", {duration: 3500});
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