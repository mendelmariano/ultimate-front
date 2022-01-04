import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';



@Injectable()
export class LoggedinGuard implements CanActivate, CanLoad{
    constructor(private loginService:LoginService, private router: Router, private toast:ToastrService){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        
        if(!this.loginService.isUserLogged()){
            this.router.navigate(['/login']);
            return false;
        }
         //console.log("Esta logado")
        return true;
       
    }

  
    canLoad(route:Route):boolean{

        return true;
        //roles adicionadas na rota do angular
        const roles = route.data.roles;

        let hasRole = false;

        // for(let role of roles){
        //     if(this.loginService.hasRole(role)){
        //         hasRole = true;
        //         break;
        //     }
        // }

      //  console.log("Has Roles: ", hasRole) //Listar roles do usuário
        return hasRole;
      
    }
}