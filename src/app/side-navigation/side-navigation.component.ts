import { CONSTANTS } from './../model/app-model';
import { FacetItem, Keyword, data, ProductItem } from './../viewformat';
// import { CategoryNode } from './../model/filter-model';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
// import {CategoryNode} from "../tree.model";
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { SearchDriver, SearchResult } from '@elastic/search-ui';
import {
  CategoryNode,
  FilterModel,
  Gender,
  // TREE_DATA,
} from '../model/filter-model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Brand, Category, Item, Product, Store } from '../model/app-model';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent implements OnInit {
  // category: Category[] = [];
  // stores: Store[] = [];
  // treeControl = new NestedTreeControl<CategoryNode>(node => node.children);
  // dataSource: MatTreeNestedDataSource<CategoryNode> = new MatTreeNestedDataSource();
  // checklistSelection = new SelectionModel<CategoryNode>(true /* multiple */);
  // treeData: any[] = [];
  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();
  itemSelection = new SelectionModel<CategoryNode>(true);
  showAllNodes: boolean = false;
  selectedItems: number = 0;
  name: string = '';
  model: FilterModel = new FilterModel();
  male: Gender = new Gender();
  female: Gender = new Gender();
  // categoryTree:
  private nodeCounter: number = 0;
  gender: string = '1';
  minPrice = '0';
  maxPrice = '1000';
  checkedPrice: number = 1;

  // priceFormGroup!: FormGroup;
  sale: string = '1';
  prices: string[] = [
    '0',
    '50',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750',
    '800',
    '850',
    '900',
    '950',
    '1000',
  ];
  product!: Product;
  items_count = 0;
  categoryquery: string = '';
  // brands!: Brand[];
  // @Input() brands: string[] = [];
  // @Input() store: string[] = [];
  // @Input() category: CategoryNode[] = [];
  facet: FacetItem = new FacetItem();
  driver: SearchDriver = new SearchDriver(CONSTANTS.searchConfig);
  storeSelected: string[] = [];
  searchInput: string = '';
  productItem!: any;
  facetItem!: FacetItem & Record<string, any>;

  // DATA: CategoryNode[] = [];
  constructor(private service: AppServiceService) {
    this.showAllNodes = true;
    this.male.name = 'Male';
    // this.male.keywords =
    //   "man man's men men's male guy dude masculine youth " +
    //   'fellow gent son bloke chap geezer lad gentleman he';
    this.female.name = 'Female';
    // this.female.keywords =
    //   "woman woman's female females women women's lady ladies sister sister's frail frail's lass lassie " +
    //   'collen wife wifie gal Jane Judy dame broad frail maid maiden feminine' +
    //   'demoiselle gentlewoman she';
    // this.model?.genders.push(this.male, this.female);

    // this.dataSource.data = TREE_DATA;
    // this.dataSource.data = this.category;
    // console.log('mydata:\n', this.dataSource.data);
  }

  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {
    // this.getStores();
    // this.getCategory();
    // this.service.productSubject.subscribe((data) => {
    //   // this.product = data;
    //   // this.items_count = data.countallproducts;

    //   this.brands = data.brands;
    //   this.store = data.stores;
    //   this.category = data.categories;
    //   this.DATA = [];
    //   console.log('mydata:\n', data.brands);
    //   data.categories.forEach((element) => {
    //     let node = new CategoryNode();
    //     node.name = element;
    //     this.DATA.push(node);
    //     this.dataSource.data = this.DATA;
    //   });
    // });

    // this.service.maleFemaleSubject.subscribe((gender) => {
    //   if (gender) {
    //   }
    //   this.model?.genders.splice(0, this.model?.genders.length);
    //   if (gender == 'male') {
    //     this.model?.genders.push(this.male);
    //   } else if ((gender = 'female')) {
    //     this.model?.genders.push(this.female);
    //   } else {
    //     this.model?.genders;
    //   }
    //   this.submit();
    // });
    // this.getStores();

    // this.getBrands();

    this.service.faceSubject.subscribe((facet) => {
      this.facet = facet;
      // facet['category0.keyword'];
      this.treeGraph(facet);
      // console.log(facet.price[0].data);
    });

    this.service.searchSubject.subscribe((input) => {
      this.searchInput = input;
    });

    this.driver.subscribeToStateChanges((state) => {
      this.productItem = Object.assign(new ProductItem(), state.results);
      this.facetItem = Object.assign(new FacetItem(), state.facets);
      this.service.productSubject.next(this.productItem);
      this.service.totalPages.next(state.totalPages);
      this.service.totalResults.next(state.totalResults);
      this.service.faceSubject.next(this.facetItem);
      console.log('filter', this.productItem);
    });
  }
  submit() {
    // if (!this.searchInput.includes(this.gender == '2' ? 'male' : 'female')) {
    // this.driver.clearFilters();
    const search =
      this.gender == '2'
        ? this.searchInput +
          ' ' +
          "man man's men men's male guy dude masculine youth " +
          'fellow gent son bloke chap geezer lad gentleman he'
        : this.gender == '3'
        ? this.searchInput +
          ' ' +
          "woman woman's female females women women's lady ladies sister sister's frail frail's lass lassie " +
          'collen wife wifie gal Jane Judy dame broad frail maid maiden feminine' +
          'demoiselle gentlewoman she'
        : this.searchInput;
    // this.driver.getActions().setSearchTerm(search + ' ' + this.categoryquery);
    this.checkedPrice = Number(this.maxPrice) - Number(this.minPrice);
    if (this.checkedPrice > 0) {
      this.driver.getActions().setFilter('price', {
        from: this.minPrice,
        to: this.maxPrice,
        name: 'price',
      });
    }
    // } else
    if (this.storeSelected.length > 0) {
      this.storeSelected.forEach((s) => {
        this.driver.addFilter('store_name.keyword', s);
        // this.driver.getActions().setSearchTerm(this.searchInput);
      });
    }
    // this.driver.getActions().setSearchTerm(this.searchInput);
    // console.log(this.storeSelected);
    // this.service
    //   .getProductByFilter(this.model, '0')
    //   .subscribe((data: Product) => {
    //     // console.log("from source ", data)
    //     this.service.productSubject.next(data);
    //   });
    // this.service.filterSubject.next(this.model);
    // this.driver.getActions().setSearchTerm(search);
  }

  public treeGraph(facet: FacetItem) {
    const cat0 = facet['category0.keyword'][0].data;
    const cat1 = facet['category1.keyword'][0].data;
    const cat2 = facet['category2.keyword'][0].data;
    const cat3 = facet['category3.keyword'][0].data;
    const tree: CategoryNode[] = [];
    for (let index = 0; index < cat0.length; index++) {
      const element = cat0[index];
      const node = new CategoryNode();
      node.name = element.value;
      node.count = element.count;
      tree.push(node);
    }
    for (let index = 0; index < cat1.length; index++) {
      const element = cat1[index];
      // const node = new CategoryNode();
      const catNames = element.value.split('>');
      tree.forEach((node) => {
        if (node.name == catNames[0]) {
          let node1 = new CategoryNode();
          node1.count = element.count;
          node1.name = catNames[1];
          tree[tree.indexOf(node)].children.push(node1);
        }
      });
      // node.count = element.count;
    }
    for (let index = 0; index < cat2.length; index++) {
      const element = cat2[index];
      // const node = new CategoryNode();
      const catNames = element.value.split('>');
      tree.forEach((node0) => {
        if (node0.name == catNames[0]) {
          tree[tree.indexOf(node0)].children.forEach((node1) => {
            if (
              node1.name == catNames[1] &&
              !catNames[2].includes('Clothing')
            ) {
              let node2 = new CategoryNode();
              node2.count = element.count;
              node2.name = catNames[2];
              const indx0 = tree.indexOf(node0);
              const indx1 = tree[indx0].children.indexOf(node1);
              tree[indx0].children[indx1].children.push(node2);
            }
          });
        }
      });
    }
    this.dataSource.data = tree;
    // console.log('Tree\n', tree);
  }
  public onNodeSelected(node: CategoryNode): void {
    // this.selectedNode = node;
  }

  descendantsAllSelected(node: CategoryNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.itemSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected and not all are selected */
  descendantsPartiallySelectedAndNotAll(node: CategoryNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.itemSelection.isSelected(child)
    );

    return result && !this.descendantsAllSelected(node);
  }

  /* Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CategoryNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.itemSelection.isSelected(child)
    );
    // let cat = '';
    // descendants.forEach((d) => {
    //   cat = cat + '>' + d.name;
    // });
    // console.log(cat);
    return result;
  }

  /* Toggle selection */
  itemSelectionToggle(node: CategoryNode) {
    this.itemSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.itemSelection.isSelected(node)
      ? this.itemSelection.select(...descendants)
      : this.itemSelection.deselect(...descendants);

    //
    this.markSelectedNodes();
    // store the number of selected items on toggle
    this.selectedItems = this.itemSelection['_selection'].size;

    if (this.itemSelection.isSelected(node)) {
      this.model.category.push(node);
      // console.log(this.model.category.indexOf(node))
      // console.log(this.model.category)
    } else {
      this.model.category.splice(this.model.category.indexOf(node, 0), 1);
    }

    this.categoryquery = node.name;
    descendants.forEach((d) => {
      this.categoryquery = this.categoryquery + '>' + d.name;
    });
    console.log(this.categoryquery);
    // console.log(this.model)

    this.submit();
  }

  // itemSelectionToggle(node: CategoryNode): void {
  //   this.itemSelection.toggle(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   this.itemSelection.isSelected(node)
  //     ? this.itemSelection.select(...descendants)
  //     : this.itemSelection.deselect(...descendants);
  //
  //   // Force update for the parent
  //   descendants.forEach(child => this.itemSelection.isSelected(child));
  //   // this.checkAllParentsSelection(node);
  // }

  /* toggle for showing selected nodes or showing all nodes */
  toggleSelectedNodes() {
    this.showAllNodes = !this.showAllNodes;
    this.markSelectedNodes();
  }

  /* Mark nodes that are in itemsSelection as selected */
  markSelectedNodes() {
    for (const node of this.dataSource.data) {
      if (this.descendantsPartiallySelected(node)) {
        // node.selected = true;
        this.checkDescendants(node);
      } else {
        // node.selected = false;
      }
    }
  }

  /* Recursively mark children nodes that are in itemsSelection as selected */
  checkDescendants(CategoryNode: { children: any }) {
    if (CategoryNode.children) {
      for (const node of CategoryNode.children) {
        if (this.descendantsPartiallySelected(node)) {
          node.selected = true;
          this.checkDescendants(node);
        } else {
          if (this.itemSelection.isSelected(node)) {
            node.selected = true;
          } else {
            node.selected = false;
          }
        }
      }
    }
  }

  /* search nodes by node name */
  // filterNodes(text: any) {
  //   const treeData = this.treeData.filter((node) => this.findNode(node, text));
  //   this.dataSource.data = treeData;
  // }

  /* recursively checks if any node is present with the searched tname */
  // filterFormGroup!: FormGroup;
  // private fb!: FormBuilder;
  //
  // reactiveForm() {
  //   this.filterFormGroup = this.fb.group({
  //     gender: [''],
  //     gender: [''],
  //   });
  // }

  // findNode(node: { name: string; children: any }, text: string) {
  //   if (node.name.toLowerCase().includes(text.toLowerCase())) {
  //     return true;
  //   }
  //   let returnVal: boolean;
  //   if (node.children) {
  //     for (const n of node.children) {
  //       returnVal = this.findNode(n, text);
  //       if (returnVal) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  onGenderSelected() {
    // console.log("Gender N0: ", this.gender)
    // this.model?.genders.splice(0, this.model?.genders.length);
    // if (this.gender == '2') {
    //   this.genders.push(this.male);
    // } else if (this.gender == '3') {
    //   this.model?.genders.push(this.female);
    // } else {
    //   // this.model?.genders.length = 0
    // }
    // console.log("model ", this.model)
    this.submit();
  }
  onPriceChagedCustom() {
    this.checkedPrice = Number(this.maxPrice) - Number(this.minPrice);
    if (this.checkedPrice > 0) {
      //   this.model.min_price = this.minPrice;
      //   this.model.max_price = this.maxPrice;
      //   // this.submit();
      // this.driver.addFilter('price', {
      //   from: this.minPrice,
      //   to: this.maxPrice,
      //   name: 'price',
      // });
    }
    this.submit();
  }
  onPriceChaged(value: string) {
    if (value.includes('0 - 50')) {
      this.driver.addFilter('price', {
        from: '0',
        to: '50',
        name: 'price',
      });
    }
    if (value.includes('50 - 100')) {
      this.driver.addFilter('price.keyword', {
        from: '50',
        to: '100',
        name: 'price',
      });
    }
    if (value.includes('100 - 200')) {
      this.driver.addFilter('price', {
        from: '100',
        to: '200',
        name: 'price',
      });
    }
    if (value.includes('200+')) {
      this.driver.addFilter('price', {
        from: '200',
        // to: '50',
        name: 'price',
      });
    }
  }

  onStoreItemSelected($event: MatCheckboxChange, store: any) {
    if ($event.checked) {
      this.storeSelected.push(store.value);
    } else {
      this.storeSelected.splice(this.storeSelected.indexOf(store.value), 1);
    }
    this.submit();
  }

  onBrandItemSelected($event: MatCheckboxChange, brand: any) {
    // brand.name="Double G";
    // if ($event.checked) {
    //   this.model.brand.push(brand);
    // } else {
    //   this.model.brand.splice(this.model.brand.indexOf(brand, 0), 1);
    // }
    // console.log(this.model)
    // this.submit();
  }
}
