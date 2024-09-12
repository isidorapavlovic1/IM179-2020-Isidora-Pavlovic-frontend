import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ODELJENJE_URL } from 'src/app/constants';
import { Odeljenje } from 'src/app/models/odeljenje';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {

  constructor(private httpClient:HttpClient) { }

  public getAllOdeljenje():Observable<any>{
    return this.httpClient.get(`${ODELJENJE_URL}`);
  }

  public addOdeljenje(odeljenje: Odeljenje):Observable<any>{
   return this.httpClient.post(`${ODELJENJE_URL}`, odeljenje)
  }

  public updateOdeljenje(odeljenje: Odeljenje):Observable<any>{
    return this.httpClient.put(`${ODELJENJE_URL}/${odeljenje.id}`, odeljenje)
  }

  public deleteOdeljenje(odeljenjeId:number):Observable<any>{
    return this.httpClient.delete(`${ODELJENJE_URL}/${odeljenjeId}`)
  }
}

