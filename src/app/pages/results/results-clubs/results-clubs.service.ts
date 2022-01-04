import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { config } from 'src/app/app.conf';
import { catchError, map } from 'rxjs/operators';
import { Club } from '../../membership/club.model';


@Injectable({
  providedIn: 'root'
})
export class ResultsClubsService {
  public url = config.URL_BACKEND;
  constructor(public http:HttpClient) { }

  getClubs(): Observable<Club[]> {
   
      return this.http.get<Club[]>(`${this.url}/clubs`).pipe(
          map(this.jsonDataToClubs),
          catchError(this.handleError)
      );
      
      
  }

  getClubsPostResult(user): Observable<Club[]> {
   
    return this.http.post<Club[]>(`${this.url}/clubs/result_post`, user).pipe(
        map(this.jsonDataToClubs),
        catchError(this.handleError)
    );
    
    
}

  public postResult(result: any){
    //console.log("resultado final: ", result);
    return this.http.post(`${this.url}/results`, result);
  }

  private jsonDataToClubs(jsonData: any): Club[] {
        
    let clubs: Club[] = [];
    const data = jsonData;
    data.forEach(element => { const club = Object.assign(new Club(), element);        
    clubs.push(club) 
    });        
    //console.log("clubs: ", clubs);        
    return clubs;
    //return Object.assign(new Imovel(), jsonData)
  }

  

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
