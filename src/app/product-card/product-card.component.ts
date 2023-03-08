import { ProductItem } from './../viewformat';
import { AppServiceService } from './../app-service.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, User } from '../model/app-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product: ProductItem = new ProductItem();
  @Input()
  user: User = new User();
  @Output()
  signUser = new EventEmitter<boolean>();
  @Output()
  addProducttoWardrop = new EventEmitter<ProductItem>();
  i: any;
  wishlistIcon: any;
  wardrobelistIcon: any;

  constructor(private service: AppServiceService) {
    if (this.user.wardrobeIds.includes(this.product.id.raw)) {
      this.wardrobelistIcon = 'done';
    } else {
      this.wardrobelistIcon = 'add';
    }

    // console.log('my product', this.product);
  }
  onWishListClicked() {
    if (this.user.wishlist == null) this.user.wishlist = [];
    if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
    if (this.user.id.length < 3) {
      this.signUser.emit(true);
    } else {
      if (this.wishlistIcon == 'favorite') {
        this.wishlistIcon = 'favorite_border';
        // remove from users wish list
        this.user.wishlist.splice(
          this.user.wishlist.indexOf(this.product.id.raw, 0),
          1
        );
        // console.log(this.user);
        this.service.updateUser(this.user).subscribe((user) => {
          this.user = user;
        });

        // }
      } else {
        this.wishlistIcon = 'favorite';
        //add to users wishlist
        if (!this.user.wishlist.includes(this.product.id.raw)) {
          this.user.wishlist.push(this.product.id.raw);
          // console.log(this.user);
          this.service.updateUser(this.user).subscribe((user) => {
            this.user = user;
          });
        }

        // }
      }

      this.service.userSubject.next(this.user);
    }
  }
  onAddtoWardrobeClicked(arg0: any) {
    if (this.user.wardrobeIds == null) this.user.wishlist = [];
    if (this.user.wardrobeIds == null) this.user.wardrobeIds = [];
    if (this.user.id.length < 3) {
      this.signUser.emit(true);
    } else {
      this.addProducttoWardrop.emit(this.product);
    }
  }

  onProductClicked(item: ProductItem) {
    this.service.itemClicked.next(item);
  }
}
