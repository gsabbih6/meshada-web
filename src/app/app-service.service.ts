import { Injectable } from '@angular/core';
import {
  Brand,
  Category,
  Discover,
  Item,
  Product,
  Purchase,
  Store,
  User,
  Wardrobe,
  WardrobeDetail,
} from './model/app-model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FilterModel } from './model/filter-model';
import { SearchResult } from '@elastic/search-ui';
import { FacetItem, ProductItem } from './viewformat';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  store: Store[] = [];
  // private baseUrl = '/api/';
  // private baseUrl = 'http://localhost:8080/api/';
  private baseUrl = 'https://api.meshada.com/api/';
  private user: User = new User();
  userSubject: BehaviorSubject<User>;

  // private product: Product = new Product();
  search: string = '';
  searchSubject: BehaviorSubject<string>;
  // productSubject: BehaviorSubject<Product>;

  private wardRobe: WardrobeDetail[] = [];
  wardrobeSubject: BehaviorSubject<WardrobeDetail[]>;

  navSubject: BehaviorSubject<boolean>;
  trendSubject: BehaviorSubject<boolean>;

  maleFemaleSubject: BehaviorSubject<string>;

  private filter: FilterModel = new FilterModel();
  filterSubject: BehaviorSubject<FilterModel>;

  backdropSubject: BehaviorSubject<boolean>;

  refreshSubject: BehaviorSubject<boolean>;
  headerSubject: BehaviorSubject<boolean>;

  brandsSubject: BehaviorSubject<Brand[]>;
  private brand: Brand[] = [];

  homeSubject: BehaviorSubject<boolean>;
  // searchSubject: BehaviorSubject<string>();
  faceSubject: BehaviorSubject<FacetItem>;
  productSubject: BehaviorSubject<ProductItem[]>;
  product: ProductItem[] & SearchResult = [];
  facet: FacetItem & Record<string, any> = new FacetItem();

  totalPages: BehaviorSubject<number>;
  totalResults: BehaviorSubject<number>;
  itemClicked: BehaviorSubject<ProductItem>;

  constructor(private http: HttpClient) {
    this.itemClicked = new BehaviorSubject(new ProductItem());
    this.totalPages = new BehaviorSubject(0);
    this.totalResults = new BehaviorSubject(0);
    this.userSubject = new BehaviorSubject(this.user);
    this.faceSubject = new BehaviorSubject(this.facet);
    this.productSubject = new BehaviorSubject(this.product);
    this.searchSubject = new BehaviorSubject(this.search);
    this.wardrobeSubject = new BehaviorSubject(this.wardRobe);
    this.navSubject = new BehaviorSubject<boolean>(false);
    this.trendSubject = new BehaviorSubject<boolean>(false);
    this.backdropSubject = new BehaviorSubject<boolean>(false);
    this.maleFemaleSubject = new BehaviorSubject(this.search);
    this.filterSubject = new BehaviorSubject(this.filter);
    this.brandsSubject = new BehaviorSubject<Brand[]>(this.brand);
    this.refreshSubject = new BehaviorSubject<boolean>(false);
    this.headerSubject = new BehaviorSubject<boolean>(true);
    this.homeSubject = new BehaviorSubject<boolean>(true);
  }

  public buildTree() {
    return this.http.get('./assets/category.json');
  }

  userToken(idToken: string, client: string) {
    let params = new HttpParams().set('idToken', idToken).set('client', client);
    return this.http.get<User>(this.baseUrl + 'auth/user', { params: params });
  }

  updateUser(user: User) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<User>(
      this.baseUrl + 'auth/user/update',
      JSON.stringify(user),
      { headers }
    );
  }

  getUserWishlist(user: User) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Item[]>(
      this.baseUrl + 'auth/user/wishlist',
      JSON.stringify(user),
      { headers }
    );
  }

  getTrendingProducts() {
    return this.http.get<Item[]>(this.baseUrl + 'search/trending');
    // throw new Error('Method not implemented.');
  }

  getHotProducts() {
    return this.http.get<Item[]>(this.baseUrl + 'search/hotnow');
    // throw new Error('Method not implemented.');
  }

  getAllProducts(page: number) {
    let params = new HttpParams().set('page', String(page));
    // this.http.get<Product>(this.baseUrl + 'product/all', {params: params}).toPromise().then(function (res) {
    //   console.log(res)
    // })
    let today = new Date();
    let tommorrow = new Date(today);
    tommorrow.setDate(tommorrow.getDate() + 1);
    // let headers = new HttpHeaders().set('Expires', tommorrow.toDateString());
    return this.http.get<Product>(this.baseUrl + 'product/all', {
      params: params,
      // headers: headers,
    });
  }

  getProductCount() {
    return this.http.get<number>(this.baseUrl + 'product/product_count');
  }

  getStoreCount() {
    return this.http.get<number>(this.baseUrl + 'store/store_count');
  }

  getProductBySearch(query: string, page: string, userId: string) {
    let params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('userId', userId); //Create new HttpParams
    // console.log(params);
    return this.http.get<Product>(this.baseUrl + 'search/query', {
      params: params,
    });
    // throw new Error('Method not implemented.');
  }

  getProductBySearchRecommended(query: string, page: number) {
    let params = new HttpParams().set('query', query).set('page', String(page)); //Create new HttpParams
    // console.log(params);
    return this.http.get<Product>(this.baseUrl + 'search/query_recommended', {
      params: params,
    });
  }

  getProductBySearchPriceLowHigh(query: string, page: number) {
    let params = new HttpParams().set('query', query).set('page', String(page)); //Create new HttpParams
    // console.log(params);
    return this.http.get<Product>(
      this.baseUrl + 'search/query_price_low_high',
      {
        params: params,
      }
    );
  }

  getProductBySearchPriceHighLow(query: string, page: string) {
    let params = new HttpParams().set('query', query).set('page', page); //Create new HttpParams
    // console.log(params);
    return this.http.get<Product>(
      this.baseUrl + 'search/query_price_high_low',
      {
        params: params,
      }
    );
  }

  getStores() {
    let params = new HttpParams().set('page', '0'); //Create new HttpParams
    return this.http.get<Store[]>(this.baseUrl + 'store/all', {
      params: params,
    });
    // throw new Error('Method not implemented.');
  }
  // postQueryLog(query:string,userId:string) {
  //   let params = new HttpParams().set('query', query).set('userId',userId)//Create new HttpParams
  //   // console.log(params)
  //   return this.http.get<any>(this.baseUrl + 'search/logs',{ params: params,});
  //   // throw new Error('Method not implemented.');
  // }
  getCategory() {
    return this.http.get<Category[]>(this.baseUrl + 'category/all');
    // throw new Error('Method not implemented.');
  }

  getProductByFilter(query: FilterModel, page: string) {
    let params = new HttpParams().set('page', page); //Create new HttpParams
    const headers = { 'content-type': 'application/json' };
    // console.log(params);
    const data = JSON.stringify(query);
    return this.http.post<Product>(this.baseUrl + 'search/filter', data, {
      headers: headers,
      params: params,
    });
    // throw new Error('Method not implemented.');
  }

  getWardrope(userid: string) {
    let params = new HttpParams().set('userid', userid);
    return this.http.get<WardrobeDetail[]>(
      this.baseUrl + 'wardrobe/wardrobes',
      {
        params: params,
      }
    );
    // throw new Error('Method not implemented.');
  }

  createNewWardrope(name: string, userid: string) {
    let params = new HttpParams().set('name', name).set('userid', userid); //Create new HttpParams
    return this.http.get<WardrobeDetail>(this.baseUrl + 'wardrobe/create', {
      params: params,
    });
    // throw new Error('Method not implemented.');
  }

  updateWardrope(wardrobe: Wardrobe) {
    const headers = { 'content-type': 'application/json' };
    // console.log(params);
    const data = JSON.stringify(wardrobe);
    return this.http.post<WardrobeDetail>(
      this.baseUrl + 'wardrobe/update',
      data,
      {
        headers: headers,
      }
    );
  }

  getProduct(productids: string[]) {
    const headers = { 'content-type': 'application/json' };
    // console.log(params);
    const data = JSON.stringify(productids);
    return this.http.post<Item[]>(this.baseUrl + 'product/productlist', data, {
      headers: headers,
    });
  }

  getProductOne(id: string) {
    // let params = new HttpParams().set('userid', userid);
    return this.http.get<Item>(this.baseUrl + 'wardrobe/wardrobes/' + id);
    // throw new Error('Method not implemented.');
  }

  getProductOner1(id: string) {
    // let params = new HttpParams().set('userid', userid);
    return this.http.get<Item>(this.baseUrl + 'product/' + id);
    // throw new Error('Method not implemented.');
  }

  getPurchase(productid: string) {
    let params = new HttpParams().set('productid', productid);
    return this.http.get<Purchase>(this.baseUrl + 'purchase/generate/', {
      params: params,
    });
    // throw new Error('Method not implemented.');
  }

  getRecommendedBrand() {
    // let params = new HttpParams().set('query', query).set('page', page);
    return this.http.get<Product>(
      this.baseUrl + 'search/query_recommended_brand/'
    );
    // throw new Error('Method not implemented.');
  }

  getBrands() {
    // let params = new HttpParams().set('productid', productid);
    return this.http.get<Brand[]>(this.baseUrl + 'brand/all/');
    // throw new Error('Method not implemented.');
  }

  getDiscover() {
    // let params = new HttpParams().set('productid', productid);
    return this.http.get<Discover[]>(this.baseUrl + 'discover/all/');
    // throw new Error('Method not implemented.');
  }

  getStoreOne(storeID: string) {
    return this.http.get<Store>(this.baseUrl + 'store/' + storeID);
  }

  getUser(userID: string) {
    return this.http.get<User>(this.baseUrl + 'auth/' + userID);
  }

  connectStripe(userid: string) {
    // let params = new HttpParams().set('userid', userid);
    // return this.http.get(this.baseUrl + 'payment/redirect', {
    //   params: params,
    // });
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.http.get(this.baseUrl + 'payment/redirecttest', {
      headers,
      responseType: 'text',
    });
  }
}
