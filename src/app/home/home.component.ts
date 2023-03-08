import { Component, OnInit } from '@angular/core';
import { Brand, Discover, Item, Product, User } from '../model/app-model';
import { AppServiceService } from '../app-service.service';
import { SignindialogComponent } from '../signindialog/signindialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationdialogComponent } from '../informationdialog/informationdialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingProduct: ReadonlyArray<Item> | undefined;
  recBrand: Product = new Product();
  brands: Brand[] = [];
  discover: Discover[] = [];
  page: number = 0;
  brand: string = '';
  user: User = new User();

  constructor(private service: AppServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.getDealsProducts();
    // this.getRecommendedBrand();
    this.service.homeSubject.next(false);

    this.service.brandsSubject.subscribe((data) => {
      this.brands = data;
    });
    this.service.userSubject.subscribe((message) => {
      this.user = message;
    });
  }

  private getDealsProducts() {}

  getRecommendedBrand() {
    // this.brand = this.brands[Math.floor(Math.random() * this.brands.length)]
    // this.page = Math.floor(Math.random() * 20)
    this.service.getRecommendedBrand().subscribe((data) => {
      this.recBrand = data;
      this.brand = data.products[0].brand_name;
      // console.log('brand : ', data)
    });
  }

  ngOnDestroy() {}

  public signin() {
    const dialogRef = this.dialog.open(SignindialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  onWishListClicked(brand: Product) {
    // console.log('wis')
    if (this.user.wishlist == null) this.user.wishlist = [];
    if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
    if (this.user.id.length < 3) {
      this.signin();
    } else {
      // let item = this.recBrand.products[i];
      brand.products.forEach((b) => {
        if (!this.user.wishlist.includes(b.id)) {
          this.user.wishlist.push(b.id);
          this.service.updateUser(this.user).subscribe((user) => {
            this.user = user;
          });
        }
      });

      this.service.userSubject.next(this.user);
    }
  }

  getCashBack() {
    const dialogRef = this.dialog.open(InformationdialogComponent, {
      height: '260px',
      width: '400px',
    });
  }
}
