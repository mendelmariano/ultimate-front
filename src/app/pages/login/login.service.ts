import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, filter, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { config } from 'src/app/app.conf';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlPath = config.URL_BACKEND;
  //userLogged: User;
  urlNavigate: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => this.urlNavigate = e.url);
  }

  isUserLogged(): boolean {
    //para estar logado deve exitir o token 
    // e
    // o time atual ser < que o time expirtarion do token
    // console.log("User logged: ", !!this.getUserLogged());
    // console.log("Expired: ", !!this.tokenExpired());

    return !!this.getUserLogged() && !this.tokenExpired();
  }


  getToken() {
    return JSON.parse(localStorage.getItem(config.KEY_LOCAL_STORAGE));
  }

  tokenExpired() {
    return (Math.floor((new Date).getTime() / 1000)) >= this.getDecodedAccessToken().exp;
  }

  getUserLogged() {
    return JSON.parse(localStorage.getItem(config.KEY_USER));
  }

  clubsUser(user):Observable<any[]>{
    var endereco1=`${this.urlPath}/users/club/${user.id}`
    //console.log("atualizando: ", endereco1);
    
    return this.http.get(`${this.urlPath}/users/club/${user.id}`).pipe(
      catchError(null),
      tap()
    );
}


  setExpirationIn(time_in_seconds){
    localStorage.setItem(config.KEY_EXPIRES_IN, JSON.stringify(time_in_seconds));
  }

  getExpirationIn(){
    return JSON.parse(localStorage.getItem(config.KEY_EXPIRES_IN));
  }


  login(email: string, password: string): any {
    //console.log('url login: ', `${this.urlPath}/api/login`);
    return this.http.post(`${this.urlPath}/authenticator`, { email, password })
      .pipe(
        tap((auth: any) => {
           //console.log(auth);
          localStorage.setItem(config.KEY_LOCAL_STORAGE, JSON.stringify(auth.access_token));
          localStorage.setItem(config.KEY_USER, JSON.stringify(auth.user));
          localStorage.setItem(config.KEY_EXPIRES_IN, JSON.stringify(auth.expires_in));
        })
      );

  }

  handleLogin(path = this.urlNavigate) {
    this.router.navigate(['/login', path])
  }

  logout() {
    // this.userLogged=undefined;
    // console.log('logout()');
    localStorage.removeItem(config.KEY_LOCAL_STORAGE);
    localStorage.removeItem(config.KEY_EXPIRES_IN);
    localStorage.removeItem(config.KEY_USER);
    
    this.router.navigate(['/login']);
  }


  getDecodedAccessToken(): any {
    return jwt_decode(JSON.parse(localStorage.getItem(config.KEY_LOCAL_STORAGE)));
  }


  hasPermission(p_permisssion: string):boolean{
    
    const token = this.getUserLogged();

    const token_decoded = this.getDecodedAccessToken();

    const permissions_user_backend = token_decoded.permissions;

    //  console.log("Token decoded:",token_decoded);
    // console.log("Permissões do usuário enviadas do backend:",permissions_user_backend);

    for(const permission of permissions_user_backend){
      if(permission.slug === p_permisssion){
        // console.log(`Usuario validado. Deveira ter a permissão:${p_permisssion} e possui a permissão:${permission.slug}`);
        return true;
      }
    }

    return false;
  }

  hasRole(p_role: string):boolean{
 
    const token = this.getUserLogged();

    const token_decoded = this.getDecodedAccessToken();

    const roles_user_backend = token_decoded.roles;

    // console.log("Token decoded:",token_decoded);
    // console.log("Roles enviadas do backend:",roles_user_backend);

    for(const role of roles_user_backend){
      if(role.slug === p_role){
        // console.log(`Usuario validado. Deveira ter a role:${p_role} e possui a role:${role.slug}`);
        return true;
      }
    }

    return false;
  }



}
