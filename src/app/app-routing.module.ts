import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './Pages/coin-detail/coin-detail/coin-detail.component';
import { CoinListComponent } from './Pages/coin-list/coin-list/coin-list.component';

const routes: Routes = [
  {path: '', redirectTo :'coin-list', pathMatch : 'full'},
  {path: 'coin-list', component: CoinListComponent},
  {path: 'coin-details/:id', component: CoinDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
