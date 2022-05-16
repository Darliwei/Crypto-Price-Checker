import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  currency : string = "USD"
  currencyBanner: any = [];
  trandingCurrencies: any = [];

  constructor(
    private api : ApiService,
    private router : Router,
    private currencyService : CurrencyService
  ) { }

  ngOnInit(): void {
    this.getCurrencyBanner();
    this.getTrendingCurrencies();
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getCurrencyBanner();
      this.getTrendingCurrencies();
    });
  }

  getCurrencyBanner(){
    this.api.getCurrency(this.currency).subscribe((result: any) => {
      this.currencyBanner = result;
      this.dataSource = new MatTableDataSource(this.currencyBanner);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTrendingCurrencies(){
    this.api.getTrendingCurrency(this.currency).subscribe((result: any) => {
      this.trandingCurrencies = result;
      console.log(this.trandingCurrencies);
    })
  }

  getCoinDetail(row: any){
    this.router.navigate(['coin-details', row.id])
  }

}
