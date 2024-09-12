import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolnicaComponent } from './main/bolnica/bolnica.component';
import { PacijentComponent } from './main/pacijent/pacijent.component';
import { DijagnozaComponent } from './main/dijagnoza/dijagnoza.component';
import { OdeljenjeComponent } from './main/odeljenje/odeljenje.component';
import { AuthorComponent } from './utility/author/author.component';
import { AboutComponent } from './utility/about/about.component';
import { HomeComponent } from './utility/home/home.component';

const routes: Routes = [
{path: 'bolnica', component: BolnicaComponent},
{path: 'dijagnoza', component: DijagnozaComponent},
{path: 'odeljenje', component: OdeljenjeComponent},
{path: 'pacijent', component: PacijentComponent},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'author', component: AuthorComponent},
{path: '', component: HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }