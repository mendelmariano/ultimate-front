import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ResultsConfirmService } from './results-confirm.service';

@Component({
  selector: 'app-results-confirm',
  templateUrl: './results-confirm.component.html',
  styleUrls: ['./results-confirm.component.scss'],
  providers: [ResultsConfirmService]
})
export class ResultsConfirmComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  idsProcessados = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { id: 'id', width: 30  },
    { name: 'TimeA'},
    { timeB: 'Time 2' },
    { golsTimeA: 'Gols' },
    { golsTimeB: 'Gols' },

  ];

  constructor(
    public resultsConfirmService:ResultsConfirmService,
    public toastrService: ToastrService
  ) { 
    
    this.loadConfirmResults();
    
   }

  ngOnInit() {
  }


  loadConfirmResults(){
    this.resultsConfirmService.getResultsUserForConfirm().subscribe( results => {      
      //console.log("resultados: ", results);
      this.rows = results;
      this.temp = [...results];      
    });
  }


  updateFilter(event) {
    
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(index => {
      return (index.timeA.toLowerCase().indexOf(val) !== -1 ||
        index.timeB.toLowerCase().indexOf(val) !== -1 ||       
        !val);
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  computaResultado(resultado, opcao){
    //console.log("resultado> ", resultado);
    if(opcao===1){
      this.resultsConfirmService.confirmResult(resultado).subscribe( results => {      
        this.toastrService.success(results.message);        
        //console.log("resultado confirmado: ", results);
        this.loadConfirmResults();
              
      });
    }
    if(opcao===2){
      this.resultsConfirmService.rejeitaResult(resultado).subscribe( results => {      
        this.toastrService.warning(results.message);
        //console.log("resultado rejeitado: ", results);
        this.loadConfirmResults();
      
      });
    }
    this.loadConfirmResults();
  }


  computaResultados(tipo){
    //console.log("selecionados: ", this.selected);
    //console.log("tipo: ", tipo);
    var ids = [];

    this.selected.forEach(
      resultado=>{
        ids.push(resultado.id);
      }
    )

    var resultados:any = {};
    resultados.tipo = tipo;
    resultados.ids = ids;

    
      this.resultsConfirmService.computaResults(resultados).subscribe( results => {  
        this.toastrService.success(results.message);
        //console.log(results);
        this.loadConfirmResults();
    });

  
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
  }

  onActivate(event) {
    //console.log('Activate Event', event);
    /* if(event.type==='checkbox'){
      console.log("checkbox master");
      var x = this.idsProcessados.indexOf(event.row.id);
      if(x>-1)
      this.idsProcessados.splice(x);
      else this.idsProcessados.push(event.row.id);
              
      console.log("ids: ", this.idsProcessados);
    } */
  }

}
