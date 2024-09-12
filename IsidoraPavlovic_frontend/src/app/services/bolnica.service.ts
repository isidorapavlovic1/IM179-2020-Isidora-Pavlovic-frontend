
import { BOLNICA_URL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolnica } from 'src/app/models/bolnica';


@Injectable({
  providedIn: 'root'
})
export class BolnicaService {

  constructor(private httpClient:HttpClient) { }

  public getAllBolnica():Observable<any>{
    return this.httpClient.get(`${BOLNICA_URL}`);
  }

  public addBolnica(bolnica:Bolnica):Observable<any>{
    return this.httpClient.post(`${BOLNICA_URL}`, bolnica);
  }

  public updateBolnica(bolnica:Bolnica):Observable<any>{
    return this.httpClient.put(`${BOLNICA_URL}/${bolnica.id}`, bolnica);
  }

  public deleteBolnica(bolnicaId:number):Observable<any>{
    return this.httpClient.delete(`${BOLNICA_URL}/${bolnicaId}`);
  }
}
  




