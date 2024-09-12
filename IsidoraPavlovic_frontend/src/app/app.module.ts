
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BolnicaComponent } from './main/bolnica/bolnica.component';
import { DijagnozaComponent } from './main/dijagnoza/dijagnoza.component';
import { OdeljenjeComponent } from './main/odeljenje/odeljenje.component';
import { PacijentComponent } from './main/pacijent/pacijent.component';
import { AuthorComponent } from './utility/author/author.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './utility/about/about.component';
import { HomeComponent } from './utility/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BolnicaDialogComponent } from './dialogs/bolnica-dialog/bolnica-dialog.component';
import { PacijentDialogComponent } from './dialogs/pacijent-dialog/pacijent-dialog.component';
import { DijagnozaDialogComponent } from './dialogs/dijagnoza-dialog/dijagnoza-dialog.component';
import { OdeljenjeDialogComponent } from './dialogs/odeljenje-dialog/odeljenje-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    BolnicaComponent,
    PacijentComponent,
    DijagnozaComponent,
    OdeljenjeComponent,
    AuthorComponent,
    AboutComponent,
    HomeComponent,
    BolnicaDialogComponent,
    PacijentDialogComponent,
    DijagnozaDialogComponent,
    OdeljenjeDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
