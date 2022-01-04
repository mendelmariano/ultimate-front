import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';
import { User } from 'src/app/pages/membership/membership.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
  public user:User;

  constructor(public loginService:LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUserLogged();
    //console.log("usuuuu: ", this.user);
  }

}
