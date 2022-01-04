import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { LoggedinGuard } from './pages/security/loggedin.guard';
import { LogoutComponent } from './pages/security/logout.component';

export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children:[
     /*  { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        data: { breadcrumb: 'Dashboard',},
        canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
      }, */
      { path: '', loadChildren: './pages/clubs/clubs.module#ClubsModule', 
      data: { breadcrumb: 'Ranking' },
      canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
    },

      { path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', 
        data: { breadcrumb: 'Membros' },
        canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
      },

      { path: 'results', loadChildren: './pages/results/results.module#ResultsModule', 
      data: { breadcrumb: 'Resultados' },
      canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
    },

    { path: 'ranking', loadChildren: './pages/clubs/clubs.module#ClubsModule', 
      data: { breadcrumb: 'Ranking' },
      canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
    },
               
      
      /* { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
      { path: 'form-elements', loadChildren: './pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
      { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
      { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
      { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
      { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
      { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
      { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
      { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },          
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } } */
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: 'logout', component:LogoutComponent},
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
   // useHash: true
});