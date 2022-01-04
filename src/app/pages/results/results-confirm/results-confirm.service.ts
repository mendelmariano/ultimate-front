import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { config } from 'src/app/app.conf';
import { catchError, map } from 'rxjs/operators';
import { Club } from '../../membership/club.model';
import { Result, ResultFormatado } from '../result.model';


@Injectable({
  providedIn: 'root'
})
export class ResultsConfirmService {
  public url = config.URL_BACKEND;
  constructor(public http:HttpClient) { }

  getClubs(): Observable<Club[]> {
   
      return this.http.get<Club[]>(`${this.url}/clubs`).pipe(
          map(this.jsonDataToClubs),
          catchError(this.handleError)
      );
      
      
  }
  getResultsUserForConfirm():Observable<any>{
    
    return this.http.get<Club[]>(`${this.url}/results/users/confirm_user`).pipe(
      map(this.jsonDataToResults),
      catchError(this.handleError)
  );
  }

  getResultsUser():Observable<any>{
    
    return this.http.get<Club[]>(`${this.url}/results/users/confirmed_user`).pipe(
      map(this.jsonDataToResults),
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

  public confirmResult(result: any):any{
    //console.log("resultado final: ", result);
    return this.http.patch(`${this.url}/results/confirma_resultado/${result.id}`, result);
  }

  public computaResults(results: any):Observable<any>{
    //console.log("resultados: ", results);
    return this.http.patch(`${this.url}/results/computa_resultados`, results);
  }



  public rejeitaResult(result: any):any{
    //console.log("resultado final: ", result);
    return this.http.patch(`${this.url}/results/rejeita_resultado/${result.id}`, result);
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

  private jsonDataToResults(jsonData: any): any {
        
    let results: ResultFormatado[] = [];
    const data = jsonData;
    
    
    
    data.forEach(element => { const result = Object.assign(new Result(), element);
      let resultadoFormatado:ResultFormatado = {};
      resultadoFormatado.id = result.id;
      resultadoFormatado.timeA = result.usuario_casa.name;
      resultadoFormatado.golsTimeA = result.gols_casa;
      resultadoFormatado.timeB = result.usuario_fora.name;
      resultadoFormatado.golsTimeB = result.gols_fora;
      if(result.status==0){
        resultadoFormatado.status = "Em espera";
      }
      if(result.status==1){
        resultadoFormatado.status = "Confirmado";
      }
      if(result.status==2){
        resultadoFormatado.status = "Recusado";
      }
      //console.log("Resulttt: ", result);      
      //console.log("rf: ", resultadoFormatado);      
      results.push(resultadoFormatado); 
    });        
    
    //console.log("rf final: ", results);
    return results
    //return Object.assign(new Imovel(), jsonData)
  }

  

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
