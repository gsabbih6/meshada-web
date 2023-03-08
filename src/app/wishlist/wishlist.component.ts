import {Component, OnInit} from '@angular/core';
import {Item, User} from "../model/app-model";
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  product: Item[] = [];
  user: User = new User();
  // transform = [
  //   {
  //     height: 250,
  //     width: 200,
  //     focus: "auto"
  //   },
  // ];
  // transformxs= [
  //   {
  //     height: 200,
  //     width: 150,
  //     focus: "auto"
  //   },
  // ];

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.service.homeSubject.next(false)
    this.service.userSubject.subscribe((user) => {
      this.user = user;

      if (this.user != null) {
        this.service.getUserWishlist(this.user).subscribe((data) => {
          this.product = data;
        })
      }

    })
  }

  removeItemforList(index: number) {
    let item = this.product[index]
    this.user.wishlist.splice(this.user.wishlist.indexOf(item.id, 0), 1)
    this.product.splice(this.product.indexOf(item, 0), 1)

    this.service.updateUser(this.user).subscribe((user) => {
      this.service.userSubject.next(user)
    })
  }

  checkImageError(string: string): boolean {
    return string.includes("ik.imagekit.io")
  }
}
