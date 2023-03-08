import {Component, OnInit} from '@angular/core';
// import {ProductService} from '../product-service.service';
// import {
//   Fade,
//   AutoPlay,
//   Pagination,
//   Arrow,
//   Parallax,
// } from '@egjs/flicking-plugins';
// import {Plugin} from '@egjs/flicking';
import {Item, Product} from "../model/app-model";
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
// interface node{
//   name: string; children?: node[];
// }
export class CollectionComponent implements OnInit {
  trendingProduct: Item[] = [];
  hotProducts: Item[] = [];

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.getTrendingProducts();
    this.getHotProducts()
  }

  getHotProducts() {
    this.service.getHotProducts().subscribe((data: Item[]) => {

      this.hotProducts = data;
      console.log(this.hotProducts);
    });
  }

  getTrendingProducts() {
    this.service.getTrendingProducts().subscribe((data: Item[]) => {
      // console.log(data);
      this.trendingProduct = data;
    });
  }

  checkImageError(string: string): boolean {
    return string.includes("ik.imagekit.io")
  }
}
