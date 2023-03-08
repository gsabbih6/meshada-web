import { Component, OnInit } from '@angular/core';
// import {Plugin} from "@egjs/ngx-flicking";
// import {Arrow} from "@egjs/flicking-plugins";
// import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { Item, User, Wardrobe, WardrobeDetail } from '../model/app-model';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css'],
})
export class WardrobeComponent implements OnInit {
  wardrobes: WardrobeDetail[] = [];
  user: User = new User();

  constructor(private service: AppServiceService) {}

  ngOnInit(): void {
    this.service.homeSubject.next(false);
    this.service.userSubject.subscribe((user) => {
      // get wardrope
      this.user = user;
      if (user.id != '') {
        // this.service.createNewWardrope("test",user.id).subscribe((data)=>{
        //   console.log(data)
        // })
        this.service.getWardrope(user.id).subscribe((data) => {
          this.wardrobes = data;
          // console.log(this.wardrobes)
        });
      }
    });
  }

  checkImageError(string: string): boolean {
    return string.includes('ik.imagekit.io');
  }

  onWishListClicked(i: number) {}

  getProducts(wardrobe: Wardrobe): Item[] {
    let products: Item[] = [];
    if (wardrobe.productids == null) wardrobe.productids = [];

    // if (productids != null)
    //   productids.forEach((id) => {
    //     this.service.getProductOne(id).subscribe((data) => {
    //       products.push(data);
    //     })
    //   })
    // console.log(JSON.stringify(wardrobe))
    return products;
  }

  removeItemforList(i: number) {}

  getProductCount(wardrobe: Wardrobe): any {
    if (wardrobe.productids != null) return wardrobe.productids.length;
    return '';
  }
}
