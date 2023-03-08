import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { CONSTANTS, Product } from '../model/app-model';
import { CategoryNode } from '../model/filter-model';
import { SearchDriver, SearchResult } from '@elastic/search-ui';
import { FacetItem, ProductItem } from '../viewformat';
import { setCurrent } from '@elastic/search-ui/lib/esm/actions';
@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.component.html',
  styleUrls: ['./commerce.component.css'],
})
export class CommerceComponent implements OnInit {
  opennav = false;
  product: Product = new Product();
  brand: string[] = [];
  category: CategoryNode[] = [];
  store: string[] = [];
  driver = new SearchDriver(CONSTANTS.searchConfig);
  facetItem!: FacetItem & Record<string, any>;
  productItem!: any;
  searchInput: string = '';
  constructor(private service: AppServiceService) {
    this.getProducts(0);
  }

  ngOnInit(): void {
    this.service.navSubject.subscribe((state) => {
      this.opennav = state;
    });
    this.driver.subscribeToStateChanges((state) => {
      this.productItem = Object.assign(new ProductItem(), state.results);
      this.facetItem = Object.assign(new FacetItem(), state.facets);
      this.service.productSubject.next(this.productItem);
      this.service.totalPages.next(state.totalPages);
      this.service.totalResults.next(state.totalResults);
      this.service.faceSubject.next(this.facetItem);
    });

    this.service.searchSubject.subscribe((input) => (this.searchInput = input));
  }
  handleNext(e: any) {
    // this.setSuggestions($e.target);
    this.driver.getActions().setSearchTerm(this.searchInput);
    this.driver.getActions().setCurrent(e);
    console.log(this.searchInput);
  }
  getProducts(page: number) {
    // this.service.getAllProducts(page).subscribe((data: Product) => {
    //   // console.log('mydata:\n', data);
    //   if (data.products.length > 1) this.product = data;
    //   data.categories.forEach((element) => {
    //     let node = new CategoryNode();
    //     node.name = element;
    //     this.category.push(node);
    //   });
    //   console.log('mydata:\n', this.product.countallproducts);
    //   // this.checkWishList(this.user);
    // });
  }
  getProductCount() {
    // this.service.getProductCount().subscribe((data: number) => {
    //   // console.log(data);
    //   this.item_count = data;
    // });
  }

  private getStoreCount() {
    // this.service.getStoreCount().subscribe((data: number) => {
    //   // console.log("Stroe", data);
    //   this.store_count = data;
    // });
  }
}
