import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './membership.model';
import { config } from 'src/app/app.conf';
import { catchError, map } from 'rxjs/operators';
import { Club } from './club.model';

@Injectable()
export class MembershipService {
    public url = config.URL_BACKEND;
    constructor(public http:HttpClient) { }

    getUsers(): Observable<User[]> {
        //const endereco = `${this.url}/users`;
        //console.log('endereco: ', endereco);
        return this.http.get<User[]>(`${this.url}/users`).pipe(
            map(this.jsonDataToUsers),
            catchError(this.handleError)
        );
        
        
    }


    getUsuarios(){       
       
        return this.http.get(`${this.url}/users`);
    }


    addUser(user:User){	            
        return this.http.post(`${this.url}/user`, user);
    }

    addClub(club:Club){	 
        return this.http.post(`${this.url}/club`, club);
    }

    updateUser(user:User){
        //console.log("atualizando: ", user);
        return this.http.put(`${this.url}/users/${user.id}`, user);
    }

    

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }


    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
      }
    



    private jsonDataToUsers(jsonData: any): User[] {
        
        let users: User[] = [];
        const data = jsonData;
        data.forEach(element => { const user = Object.assign(new User(), element);        
        delete user.password;
        var menus = user.menuIds.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        //console.log('menus: ', menus);
        user.menuIds = menus;        
        users.push(user) 
        });        
        //console.log("users: ", users);        
        return users;
        //return Object.assign(new Imovel(), jsonData)
      }
} 