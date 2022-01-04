import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ResultsConfirmService } from '../results-confirm/results-confirm.service';


@Component({
  selector: 'app-results-confirmed',
  templateUrl: './results-confirmed.component.html',
  styleUrls: ['./results-confirmed.component.scss']
})
export class ResultsConfirmedComponent implements OnInit {


  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  
  getRowClass = (row) => {
    //console.log('rowClass', row)

   if(row.status == "Confirmado"){
   return {
     'row-color1': true
   };
  }

  if(row.status == "Recusado"){
    return {
      'row-color2': true
    };
   }

  }

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
    public toastrService: ToastrService) { }

  ngOnInit() {
    this.loadResults();
  }



  loadResults(){
    this.resultsConfirmService.getResultsUser().subscribe( results => {      
      //console.log("resultados temp: ", results);
      this.rows = results;
      this.temp = [...results];      
    });
  }

 


  updateFilter(event) {
    
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(index => {
      //console.log("tal do index:", index);
      return (index.timeA.toLowerCase().indexOf(val) !== -1 ||
        index.timeB.toLowerCase().indexOf(val) !== -1 || 
        index.status.toLowerCase().indexOf(val) !== -1 || 
      
        !val);
    });
    this.rows = temp;
    this.table.offset = 0;
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
