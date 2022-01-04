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

import { ClubsRoutingModule } from './clubs-routing.module';
//import { BasicTablesComponent } from '../tables/basic-tables/basic-tables.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClubsComponent } from './clubs.component';
import { ClubRankingComponent } from './club-ranking/club-ranking.component';

export const routes = [
  { path: '', component: ClubRankingComponent, pathMatch: 'full' },

];

@NgModule({
  declarations: [ClubRankingComponent],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule,
    NgxDatatableModule,
    
  ]
})
export class ClubsModule { }
