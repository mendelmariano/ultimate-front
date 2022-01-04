import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;

  constructor(router:Router, fb:FormBuilder, private loginService:LoginService, private toastr:ToastrService) {
      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.loginService.login(values['email'], values['password']).subscribe(
        (res)   => {
          //console.log("veio com erro", res);
          this.toastr.success("Login com Sucesso!");
          this.router.navigate(['/']);
        },
        (erro)  => {
          //console.log("Errr", erro.error.message);
          this.toastr.error(` ${erro.status} Falha na autenticação!  ${erro.error.message} `);},
        ()      => {this.router.navigate(['/'])}
    );
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

}
