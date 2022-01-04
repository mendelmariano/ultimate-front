import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ClubsService } from '../../clubs.service';
import { ClubRankingService } from '../club-ranking.service';


@Component({
  selector: 'app-club-ranking',
  templateUrl: './club-ranking.component.html',
  styleUrls: ['./club-ranking.component.scss']
})
export class ClubRankingComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { id: 'id', width: 30  },
    { timeA: 'TimeA'},
    { timeB: 'Time 2' },
    { golsTimeA: 'Gols' },
    { golsTimeB: 'Gols' },

  ];

  constructor(
    public clubsService:ClubRankingService,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs(){
    this.clubsService.getClubsRanking().subscribe( clubs => {      
      //console.log("resultados temp: ", results);
      var clubs_aproveitamento = this.calculaAproveitamento(clubs);
      this.rows = clubs_aproveitamento;
      this.temp = [...clubs_aproveitamento];      
    });
  }

  calculaAproveitamento(clubs){
    let clubs_formatados = [];
    let posicao = 0;
    clubs.forEach(club => {
      let max_pontos = club.jogos*3;
      var aproveitamento = (club.pontos/max_pontos)*100;
      club.aproveitamento = aproveitamento.toFixed(2);
      posicao++;
      club.posicao = posicao;
      clubs_formatados.push(club);
    });
    //console.log("Formatados: ", clubs_formatados);
    return clubs_formatados;
  }

  updateFilter(event) {
    
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(index => {
      //console.log("tal do index:", index);
      return (index.name.toLowerCase().indexOf(val) !== -1 ||              
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
