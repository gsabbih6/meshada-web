import {
  // ChangeDetectionStrategy,
  // ChangeDetectionStrategy,
  // ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, User } from '../model/app-model';
import { MatDialog } from '@angular/material/dialog';
import { SignindialogComponent } from '../signindialog/signindialog.component';
import { AppServiceService } from '../app-service.service';
import { WardropedialogComponent } from '../wardropedialog/wardropedialog.component';
import { FilterModel } from '../model/filter-model';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacetItem, ProductItem } from '../viewformat';

@Component({
  selector: 'app-imagegallery',
  queries: {
    tabsContentRef: new ViewChild('tabsContentRef'),
  },
  templateUrl: './imagegallery.component.html',
  styleUrls: ['./imagegallery.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagegalleryComponent implements OnInit {
  totalResults: number = 0;
  totalPages: number = 0;
  storeCount: number = 0;
  facet: FacetItem & Record<string, any> = new FacetItem();
  sorting() {
    throw new Error('Method not implemented.');
  }
  // @ViewChild('scroll', { read: ElementRef }) public scroll!: ElementRef<any>;
  @Output() pevent = new EventEmitter<number>();
  @Output() recommend = new EventEmitter<boolean>();
  p: number = 1;
  searchForm!: FormGroup;
  public tabsContentRef!: ElementRef;
  selectedValue: string | undefined;
  // item_count: number = 0;
  // store_count: number = 0;
  // @Input() product: Product = new Product();
  // filterModel!: FilterModel;
  searchtag = '';
  subscription: Subscription | undefined;
  page: number = 1;
  sorts: string[] = [
    'recommended',
    'price (high to low)',
    'price (low to high)',
  ];
  @Input() searchTerm: string = '';
  // wishlistIcon: string[] = [];
  user: User = new User();
  // wardrobelistIcon: string[] = [];
  private trendState = true;
  productItem: ProductItem[] = [];
  // productItem: ProductItem[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AppServiceService,
    // private scroller: ViewportScroller,
    public dialog: MatDialog,
    private router: Router // private ref: ChangeDetectorRef
  ) {
    // console.log('data');
    // this.getProducts(this.page);
    // this.getProductCount();
    // this.getStoreCount();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.service.userSubject.subscribe((message) => {
    //   this.checkWishList(message)
    // })
    this.service.homeSubject.next(true);
    this.reactiveForm();
    // this.service.searchSubject.subscribe((data) => {
    //   this.searchtag = data;
    //   // this.p = 1;
    // });

    // this.service.filterSubject.subscribe((data) => {
    //   // this.filterModel = data;
    //   this.p = 1;
    // });

    this.service.userSubject.subscribe((message) => {
      // console.log("Shopmain received profile form signin dialog:\n", message);
      this.user = message;
      // this.checkWishList(message);
      // this.checkWishList()

      // if(this.user.id==""){
      //
      // }
      // this.product.products.forEach((item, index) => {
      //   if (this.user.wishlist.includes(item.id)) {
      //     this.wishlistIcon[index] = "favorite"
      //   } else {
      //     this.wishlistIcon[index] = "favorite_border"
      //   }
      // });
    });
    this.selectedValue = this.sorts[0];

    this.subscription = this.service.productSubject.subscribe((message) => {
      // for (var i = 0; i < message.length; i++) {
      //   this.productItem.push(message[i]);
      // }
      const p = Object.entries(message);
      this.productItem = [];
      for (var i = 0; i < p.length; i++) {
        if (message[i]) this.productItem.push(message[i]);
      }
      // this.productItem._meta;
      // remove cossabella duplicates
      // let p = message.products;
      // p = p.filter((elem, el, a) => {
      //   elem.product_name = elem.product_name.split(',')[0];
      //   return el === a.indexOf(elem);
      // });
      // // this.product.countallproducts = message.countallproducts;
      // this.product.products = p;
      // // item.product_name.replace(item.brand_name, "").split(",")[0]
      // // this.product = message;
      // this.sorting();
      // console.log('loget', this.productItem);
    });
    this.subscription = this.service.searchSubject.subscribe((message) => {
      this.searchTerm = message;
      this.p = 1;
    });
    this.service.totalPages.subscribe((data) => {
      this.totalPages = data;
    });
    this.service.totalResults.subscribe((data) => {
      this.totalResults = data;
    });
    this.service.faceSubject.subscribe((data) => {
      // this.facet = data;
      this.storeCount = data['store_name.keyword'][0].data.length;
    });
    // this.getProducts(this.page);
    // this.getProductCount();
    // this.getStoreCount();
  }

  // sorting() {
  //   if (this.selectedValue == this.sorts[0]) {
  //     this.recommend.emit(true);
  //   } else if (this.selectedValue == this.sorts[1]) {
  //     // this.product =
  //     this.product.products.sort((one, two) =>
  //       one.price[0] > two.price[0] ? -1 : 1
  //     );
  //     this.recommend.emit(false);
  //   } else if (this.selectedValue == this.sorts[2]) {
  //     // this.product =
  //     this.product.products.sort((one, two) =>
  //       one.price[0] < two.price[0] ? -1 : 1
  //     );
  //     this.recommend.emit(false);
  //   }
  // }

  // getProducts(page: number) {
  //   if (this.selectedValue == this.sorts[0] && this.searchTerm.length >= 3) {
  //     this.service
  //       .getProductBySearchRecommended(this.searchTerm, this.page)
  //       .subscribe((data: Product) => {
  //         if (data.products.length > 1) this.product = data;
  //         // this.checkWishList(this.user);
  //       });
  //   } else if (this.selectedValue == this.sorts[1]) {
  //     // this.product =
  //     this.product.products.sort((one, two) =>
  //       one.price[0] > two.price[0] ? -1 : 1
  //     );
  //   } else if (this.selectedValue == this.sorts[2]) {
  //     // this.product =
  //     this.product.products.sort((one, two) =>
  //       one.price[0] < two.price[0] ? -1 : 1
  //     );
  //   } else {
  //     this.service.getAllProducts(page).subscribe((data: Product) => {
  //       // console.log('mydata:\n', data);

  //       if (data.products.length > 1) this.product = data;
  //       console.log('mydata:\n', this.product);
  //       // this.checkWishList(this.user);
  //     });
  //   }

  //   this.service.productSubject.next(this.product);

  //   this.service.searchSubject.next('');
  // }

  // getProductCount() {
  //   // this.service.getProductCount().subscribe((data: number) => {
  //   //   // console.log(data);
  //   //   this.item_count = data;
  //   // });
  // }

  // private getStoreCount() {
  //   // this.service.getStoreCount().subscribe((data: number) => {
  //   //   // console.log("Stroe", data);
  //   //   this.store_count = data;
  //   // });
  // }

  // checkWishList(user: User) {
  //   // fill list
  //   if (this.user.wishlist == null) this.user.wishlist = [];
  //   if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
  //   if (this.product.products == null) this.product.products = [];
  //   this.product.products.forEach((item, index) => {
  //     if (this.user.wishlist.includes(item.id)) {
  //       this.wishlistIcon[index] = 'favorite';
  //     } else {
  //       this.wishlistIcon[index] = 'favorite_border';
  //     }
  //     if (this.user.wardrobeIds.includes(item.id)) {
  //       this.wardrobelistIcon[index] = 'done';
  //     } else {
  //       this.wardrobelistIcon[index] = 'add';
  //     }
  //   });
  //   // console.log("wishlist: ", this.wishlistIcon);
  // }

  // onWishListClicked(i: number) {
  //   if (this.user.wishlist == null) this.user.wishlist = [];
  //   if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
  //   if (this.user.id.length < 3) {
  //     this.openSigninDialog();
  //   } else {
  //     let item = this.product.products[i];
  //     if (this.wishlistIcon[i] == 'favorite') {
  //       this.wishlistIcon[i] = 'favorite_border';
  //       // remove from users wish list
  //       this.user.wishlist.splice(this.user.wishlist.indexOf(item.id, 0), 1);
  //       // console.log(this.user);
  //       this.service.updateUser(this.user).subscribe((user) => {
  //         this.user = user;
  //       });

  //       // }
  //     } else {
  //       this.wishlistIcon[i] = 'favorite';
  //       //add to users wishlist
  //       if (!this.user.wishlist.includes(item.id)) {
  //         this.user.wishlist.push(item.id);
  //         // console.log(this.user);
  //         this.service.updateUser(this.user).subscribe((user) => {
  //           this.user = user;
  //         });
  //       }

  //       // }
  //     }

  //     this.service.userSubject.next(this.user);
  //   }
  // }

  // openSigninDialog() {
  //   const dialogRef = this.dialog.open(SignindialogComponent, {
  //     height: '400px',
  //     width: '600px',
  //   });
  //   // console.log(`Dialog result:`);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }
  openSigninDialog(state: boolean) {
    const dialogRef = this.dialog.open(SignindialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
  onPaginationClicke($event: number, el: HTMLElement) {
    // window.scrollTo(0, 0);
    this.scrollToTop(el);
    this.p = $event;
    this.pevent.emit($event);

    // if message came from filters
    // this.getProductsbyFilter(this.FilterModel)

    // if tag is 'all' then search next all product other wiswe search with filter
    // if (this.searchtag != '') {
    //   this.getProductsSearched(this.searchtag, this.p);
    // }
    // else if (!this.isFilterEmpty(this.filterModel)) {
    //   this.getProductsFiltered(this.filterModel, this.p);
    // }
    // else {
    //   this.getProducts(this.p);
    // }
    // window.scroll(0,0);
  }

  scrollToTop(el: HTMLElement) {
    el.scrollIntoView();
  }

  isFilterEmpty(filter: FilterModel): boolean {
    if (
      filter.max_price == '10000' ||
      filter.min_price == '0' ||
      filter.store.length > 0 ||
      filter.category.length > 0 ||
      filter.genders.length > 0
    )
      return false;

    return true;
  }

  ngOnDestroy() {}

  checkImageError(string: string): boolean {
    return string.includes('ik.imagekit.io');
  }

  // onAddtoWardrobeClicked(i: number) {
  //   // let item = this.product.products[i]
  //   // this.openWardrobeDialog(item)
  //   if (this.user.wardrobeIds == null) this.user.wishlist = [];
  //   if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
  //   if (this.user.id.length < 3) {
  //     this.openSigninDialog();
  //   } else {
  //     let item = this.product.products[i];
  //     this.openWardrobeDialog(item, i);
  //   }
  // }
  onAddtoWardrobeClicked(item: ProductItem) {
    // let item = this.product.products[i]
    // this.openWardrobeDialog(item)
    // if (this.user.wardrobeIds == null) this.user.wishlist = [];
    // if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
    // if (this.user.id.length < 3) {
    //   this.openSigninDialog();
    // } else {
    // let item = this.product.products[i];
    // this.openWardrobeDialog(item);
    const dialogRef = this.dialog.open(WardropedialogComponent, {
      height: '400px',
      width: '600px',
      data: { itemid: item.id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
    // }
  }
  private openWardrobeDialog(item: Item, i: number) {
    const dialogRef = this.dialog.open(WardropedialogComponent, {
      height: '400px',
      width: '600px',
      data: { itemid: item.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`); // Pizza!
      // if (result) {
      //   if (this.wardrobelistIcon[i] == "add") {
      //     this.wardrobelistIcon[i] = "done"
      //     // remove from users wish list
      //     // if (this.user.id != '') {
      //     // this.user.wishlist.push(item.id);
      //     this.user.wishlist.splice(this.user.wishlist.indexOf(item.id, 0), 1)
      //     console.log(this.user)
      //     this.service.updateUser(this.user).subscribe((user) => {
      //         this.user = user;
      //       }
      //     );
      //
      //     // }
      //   } else {
      //     this.wardrobelistIcon[i] = "add"
      //     //add to users wishlist
      //     // if (this.user.id != '') {
      //     this.user.wishlist.push(item.id);
      //     console.log(this.user)
      //     this.service.updateUser(this.user).subscribe((user) => {
      //         this.user = user;
      //       }
      //     );
      //
      //     // }
      //   }
      // }
      // this.service.userSubject.next(this.user)
    });
  }

  onTrendsClicked() {
    this.service.trendSubject.next(this.trendState);
    this.trendState = !this.trendState;
  }

  onPurchaseClicked(item: Item) {
    // const dialogRef = this.dialog.open(InformationdialogComponent,
    //   {
    //     height: '260px',
    //     width: '400px',
    //     data: {productid: item.id, producturl: item.payment_url},
    //
    //
    //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`); // Pizza!
    // });
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/action`])
    );
    window.open('/action', '_blank');
  }

  // private getProductsFiltered(filterModel: FilterModel, p: number) {
  //   this.service
  //     .getProductByFilter(filterModel, String(p))
  //     .subscribe((data) => {
  //       if (data.products.length > 1) this.product = data;
  //       this.sorting();
  //       // this.checkWishList(this.user);
  //     });
  // }

  // private getProductsSearched(searchtag: string, p: number) {
  //   this.service
  //     .getProductBySearch(searchtag, String(p), this.user.id)
  //     .subscribe((data) => {
  //       if (data.products.length > 1) this.product = data;
  //       this.sorting();
  //       // this.checkWishList(this.user);
  //     });
  // }
  @Output() searchevent = new EventEmitter<string>();
  reactiveForm() {
    this.searchForm = this.fb.group({
      searchfield: [''],
    });
  }
  sendSearchTerm() {
    // this.searchevent.emit(this.searchForm.get('searchfield')?.value);
    // this.service.searchSubject.next(this.searchForm.get('searchfield')?.value);
  }
  // getSeraProducts() {
  //   this.service
  //     .getProductBySearch(
  //       this.searchForm.get('searchfield')?.value,
  //       '0',
  //       this.user.id
  //     )
  //     .subscribe((data: Product) => {
  //       // console.log('search count', data.count);
  //       // this.product = data;
  //       // if (data.products.length > 1) {
  //       this.service.productSubject.next(data);
  //       this.service.searchSubject.next(
  //         this.searchForm.get('searchfield')?.value
  //       );
  //       // }
  //     });
  // }
  submitForm() {
    // console.log('my serach: ', this.searchForm.get('searchfield')?.value);

    if (this.searchForm.get('searchfield')?.value) {
      this.sendSearchTerm();
      // this.getSeraProducts();
    }
    // console.log(this.product);
    // this.searchForm.get('searchfield')?.setValue('');
  }
  checkIfImageExists(url: string) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return true;
    } else {
      img.onload = () => {
        return true;
      };

      img.onerror = () => {
        return false;
      };
    }
    return false;
  }
}
