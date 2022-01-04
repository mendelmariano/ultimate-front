import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ResultsClubsService } from './results-clubs.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Club } from '../../membership/club.model';
import { LoginService } from '../../login/login.service';
import { User } from '../../membership/membership.model';
import { MembershipService } from '../../membership/membership.service';


@Component({
  selector: 'app-results-clubs',
  templateUrl: './results-clubs.component.html',
  styleUrls: ['./results-clubs.component.scss'],
  providers: [ ResultsClubsService, MenuService]
})
export class ResultsClubsComponent implements OnInit {

  public menuItems:Array<any>;  
  public clubs: Club[];
  public club: Club;
  public searchText: string;
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public resultForm:FormGroup;
  public genders = ['male', 'female'];
  public genderOption:string;
  public usuarioLogado:User;


  public menuSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
};
public menuSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'menu item selected',
    checkedPlural: 'menu items selected',
    searchPlaceholder: 'Find menu item...',
    defaultTitle: 'Select menu items for user',
    allSelected: 'All selected',
};
public menuSelectOptions: IMultiSelectOption[] = [];

constructor(
  public fb:FormBuilder, 
  public toastrService: ToastrService,
  public resultsClubsService:ResultsClubsService,
  public loginService: LoginService,
  public membershipService: MembershipService,
  public menuService:MenuService, 
  public modalService: NgbModal) {

this.menuItems = this.menuService.getVerticalMenuItems();
this.menuItems.forEach(item=>{
let menu = { 
id: item.id, 
name: item.title
}
this.menuSelectOptions.push(menu);
})
}

  ngOnInit() {
    this.getClubs(); 
    //console.log("usuario: ", this.usuarioLogado);
    this.resultForm = this.fb.group({
      casa_id: null,
      gols_casa: [null],
      gols_fora: [null],
      fora_id: [null],
      penaltis_casa: [null],
      penaltis_fora: [null],  
      email_verified_at: [null],     
      
  });
    

  }


  public buildResultForm(){


    this.resultForm = this.fb.group({
      casa_id: null,
      gols_casa: [null, Validators.compose([Validators.required])],
      gols_fora: [null],
      fora_id: [null],
      penaltis_casa: [null],
      penaltis_fora: [null],  
      email_verified_at: [null],     
      
  }); 
  }


  public getClubs(): void {
    this.usuarioLogado = this.loginService.getUserLogged(); 
    this.resultsClubsService.getClubsPostResult(this.usuarioLogado).subscribe( clubs => {      
      this.clubs = clubs
    }
      
    );    
  }

  public openMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    //console.log(event);
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }


  public postaResultado(event,club, resultado){

    var usuarioLogado:User = this.loginService.getUserLogged();    
    var placar = this.loginService.clubsUser(usuarioLogado).subscribe(clubes=> {
      //console.log("CLube usuário logado: ", clubes[0]);
      //console.log("Usuário logado: ", usuarioLogado);    
      //console.log("Clube: ", club);
      //console.log("Resultado:", resultado);
     //console.log("Evento", event)
      var resultado_final = this.montaResultado(clubes[0].id, club.id, resultado);
      this.resultsClubsService.postResult(resultado_final).subscribe(resultado=>{
        //console.log(resultado);
        this.toastrService.success('Resultado cadastrado com sucesso, aguarde a confirmação');
        
        let parent = event.target.parentNode;
        while (parent){
          parent = parent.parentNode;
          if(parent.classList.contains('content')){
            parent.classList.remove('flipped');
            parent.parentNode.parentNode.classList.remove('z-index-1');
            break;
          }
        }
        this.buildResultForm();
      });
    });


    
  }

  public montaResultado(time1, time2, resultado){
    var resultadoFormatado:any = {};
    resultadoFormatado.casa_id = time1;
    resultadoFormatado.fora_id = time2;
    resultadoFormatado.gols_casa =+ resultado.gols_casa;
    resultadoFormatado.gols_fora =+ resultado.gols_fora;
    resultadoFormatado.penaltis_casa =+ 0;
    resultadoFormatado.penaltis_fora =+ 0;
        
    return resultadoFormatado;
    

  }

}
