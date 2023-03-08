import { ProductItem } from './../viewformat';
import { Component, OnInit } from '@angular/core';
import { Item, Store, User } from '../model/app-model';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  product: ProductItem = new ProductItem();
  user: User = new User();

  // private hero: Observable<T>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppServiceService
  ) {
    setTimeout(() => {
      this.goToLink(this.product);
    }, 10);
  }

  // async init() {
  //   let split = await this.route.snapshot.paramMap.get('id')!.split('&');
  //   const p$ = this.service.getProductOner1(split[0]);
  //   this.product = split[0]//await lastValueFrom(p$);
  //   const c$ = this.service.getStoreOne(this.product.store_id);
  //   this.store = await lastValueFrom(c$);
  //   if (split[1] != '') {
  //     const u$ = this.service.getUser(split[1]);
  //     this.user = await lastValueFrom(u$);
  //   }
  // }

  ngOnInit(): void {
    this.service.itemClicked.subscribe((item) => {
      console.log('clicked action');
      this.product = item;
      this.goToLink(this.product);
    });
    // this.init().then(() => {
    //   setTimeout(() => {
    //     this.goToLink();
    //   }, 10);

    //   // console.log(this.product.payment_url)
    // });
    this.service.userSubject.subscribe((data) => {
      this.user = data;
    });
    // this.service.getStoreById(this.product.store_id)
    // if (this.router.url.includes('/action')) {
    //   console.log('Action included');
    //   this.service.headerSubject.next(false);
    // } else {
    //   this.service.headerSubject.next(true);
    // }

    //
  }

  goToLink(item: ProductItem) {
    console.log(item.payment_url.raw);
    if (this.user.id != '') {
      window.open(item.payment_url.raw + '&sid=' + this.user.id, '_self');
      // console.log(this.product.payment_url + '&sid=' + this.user.id)
    } else {
      window.open(item.payment_url.raw, '_self');
    }
    // window.open('https://www.google.com', "_self");
  }
}
