import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsClubsComponent } from './results-clubs/results-clubs.component';
import { ResultsConfirmComponent } from './results-confirm/results-confirm.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BasicTablesComponent } from '../tables/basic-tables/basic-tables.component';
import { ResultsConfirmedComponent } from './results-confirmed/results-confirmed.component';

export const routes = [
  { path: 'post-result', component: ResultsClubsComponent, pathMatch: 'full' },
  { path: 'result-confirm', component: ResultsConfirmComponent, pathMatch: 'full' },
  { path: 'result-confirmed', component: ResultsConfirmedComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ResultsClubsComponent, ResultsConfirmComponent, ResultsConfirmedComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule,
    NgxDatatableModule,
  ],
  
  
})
export class ResultsModule { }
