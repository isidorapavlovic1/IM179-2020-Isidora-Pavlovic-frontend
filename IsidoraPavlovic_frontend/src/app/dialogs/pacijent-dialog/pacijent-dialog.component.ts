import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dijagnoza } from 'src/app/models/dijagnoza';
import { Odeljenje } from 'src/app/models/odeljenje';
import { Pacijent } from 'src/app/models/pacijent';
import { DijagnozaService } from 'src/app/services/dijagnoza.service';
import { OdeljenjeService } from 'src/app/services/odeljenje.service';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-pacijent-dialog',
  templateUrl: './pacijent-dialog.component.html',
  styleUrls: ['./pacijent-dialog.component.css']
})
export class PacijentDialogComponent implements OnInit {
  flag!:number;
  odeljenjes!:Odeljenje[];
  dijagnozas!:Dijagnoza[];

  constructor(
    public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<Pacijent>,
    @Inject (MAT_DIALOG_DATA) public data: Pacijent,
    public service:PacijentService,
    public odeljenjeService: OdeljenjeService,
    public dijagnozaService: DijagnozaService
  ){}

  ngOnInit(): void {
    this.odeljenjeService.getAllOdeljenje().subscribe(
      (data) => {
        this.odeljenjes = data;
      }
    )
    this.dijagnozaService.getAllDijagnoza().subscribe(
      (data) => {
        this.dijagnozas = data;
      }
    )

  }

  public compare(a:any, b:any) {
    return a.id == b.id;
  }

  public add (){
    this.service.addPacijent(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno dodat pacijent sa ID: ${data.id}`, `U redu`,
          {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno dodavanje`, `U redu`, {duration: 2500});
  }
}
  public update (){
    this.service.updatePacijent(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno ažuriran pacijent sa ID: ${data.id}`, `U redu`,
          {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno ažuriranje`, `U redu`, {duration: 2500});
  }
}
  public delete (){
    this.service.deletePacijent(this.data.id).subscribe(
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
