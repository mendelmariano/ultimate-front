import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { MembershipService } from '../membership/membership.service';
import { ToastrService } from 'ngx-toastr';
import { User, UserAuth } from '../membership/membership.model';
import { Club } from '../membership/club.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

    steps:any[];
    submittingForm: Boolean = false;

    public router: Router;
    public form:FormGroup; 
    public clubForm: FormGroup;   
    public name:AbstractControl;
    public username:AbstractControl;
    public whatsapp:AbstractControl;
    public email:AbstractControl;
    public password:AbstractControl;
    public confirmPassword:AbstractControl;

    public clubName:AbstractControl;
    
    constructor(router:Router, fb:FormBuilder, private membershipService: MembershipService, private toastr:ToastrService){
        this.router = router;
        this.form = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            whatsapp: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },
        {validator: matchingPasswords('password', 'confirmPassword')});
        this.name = this.form.controls['name'];
        this.username = this.form.controls['username'];
        this.email = this.form.controls['email'];
        this.whatsapp = this.form.controls['whatsapp'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];



        this.clubForm = fb.group({
            clubName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });
        this.clubName = this.clubForm.controls['clubName'];

        this.steps = [
            {name: 'Usuario', icon: 'fa-user', active: true, valid: false, hasError:false },
            {name: 'Clube', icon: 'fa-home', active: false, valid: false, hasError:false },
          ]
    }

     public onSubmit():void {
        if (this.form.valid && this.clubForm.valid) {
            const user: User = Object.assign(new User(), this.form.value);
            const club: Club = Object.assign(new Club(), this.clubForm.value);
            
            const registerUser = this.membershipService.addUser(user).subscribe(
                (res:UserAuth)   => {
                  //console.log("veio com erro", res);
                  this.toastr.success("Cadastrado com sucesso!");
                  //console.log("resultado: ", res);                  
                  //console.log("user do res: ", res);
                  club.user_id = res.user.id;
                  const registerClub = this.membershipService.addClub(club).subscribe(
                    (res)   => {
                      //console.log("veio com erro", res);
                      this.toastr.success("Cadastrado com sucesso!");
                      //this.router.navigate(['/login']);
                    },
                    (erro)  => {
                      console.log("Errr", erro);
                      this.toastr.error(` ${erro.status} Falha no cadastro do clube!  ${erro.error.message} `);}
                    
                );
                  //this.router.navigate(['/login']);
                },
                (erro)  => {
                  console.log("Errr", erro);
                  this.toastr.error(` ${erro.status} Falha no cadastro do usuário!  ${erro.error.message} `);}
                
            );


            

            this.router.navigate(['/login']);

            //console.log(register);
            return
            //this.router.navigate(['/login']);
        }
    }

    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }

    public next(){
        let userForm = this.form;
        let clubForm     = this.clubForm;
    
        if(this.steps[this.steps.length-1].active)
            return false;
            
        this.steps.some(function (step, index, steps) {
            if(index < steps.length-1){
                if(step.active){
                    if(step.name=='Usuario'){
                        if (userForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Clube'){
                         if (clubForm.valid) {
                             step.active = false;
                             step.valid = true;
                             steps[index+1].active=true;
                             return true;
                         }
                         else{
                             step.hasError = true;
                         }                      
                    }
                    
                }
            }   
        });
    }

    public prev(){
        if(this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if(index != 0){
                if(step.active){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
            }             
        });
      }

      public confirm(){
        // Aqui submit todo o form
         this.steps.forEach( step => step.valid = true );
         this.submitForm();
      }
      submitForm(){
          //console.log("foi!!");
        this.onSubmit();
      }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
