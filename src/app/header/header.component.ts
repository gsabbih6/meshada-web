import { ProductItem, FacetItem } from './../viewformat';
import { CONSTANTS } from './../model/app-model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SearchDriver, SearchResult } from '@elastic/search-ui';
import { Product, User } from '../model/app-model';
import { MatDialog } from '@angular/material/dialog';
import { AppServiceService } from '../app-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InformationdialogComponent } from '../informationdialog/informationdialog.component';
import { Router } from '@angular/router';
// import { SearchBase, SearchComponent } from '@appbaseio/searchbase';
import {
  MatAutocompleteSelectedEvent,
  _MatAutocompleteBase,
} from '@angular/material/autocomplete';

export let browserRefresh = false;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  autocomplte: any[] = [];
  res: SearchResult | undefined;
  results: SearchResult[] = [];
  facetItem!: FacetItem & Record<string, any>;
  productItem!: any;
  searchForm!: FormGroup;
  product!: Product;
  user!: SocialUser;
  profile: User = new User();
  loggedIn = false;
  hideMenu!: boolean;
  searchInput = new FormControl('');
  driver = new SearchDriver(CONSTANTS.searchConfig);
  @Output() searchevent = new EventEmitter<string>();
  @Output() faceevent = new EventEmitter<FacetItem & Record<string, any>>();
  @Output() productevent = new EventEmitter<ProductItem & SearchResult>();
  constructor(
    private authService: SocialAuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: AppServiceService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    // console.log(authService.authState)
    this.matIconRegistry.addSvgIcon(
      `logo_mobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/logo_home.svg'
      )
    );
  }
  handleOptionSelect($event: MatAutocompleteSelectedEvent) {
    throw new Error('Method not implemented.');
  }
  // handleInput(e: any) {
  //   // this.setSuggestions($e.target);
  //   this.service.searchSubject.next(this.searchInput.value as string);
  //   this.driver.getActions().setSearchTerm(
  //     e.target.value
  //     //  {
  //     // autocompleteResults: true,
  //     // autocompleteSuggestions: true,
  //     // refresh: true,
  //     // }
  //   );

  // this.driver.getActions().
  // console.log('e is : ', this.searchInput.value as string);
  // }
  ngOnInit(): void {
    this.reactiveForm();
    this.service.headerSubject.subscribe((data) => {
      this.hide = data;
    });
    this.service.homeSubject.subscribe((data) => {
      this.hideMenu = data;
    });
    this.service.backdropSubject.subscribe((data) => {
      // this.navState = data
      this.menuicon = 'menu';
    });
    this.driver.subscribeToStateChanges((state) => {
      // console.log(`Received ${state.totalResults} results for your search!`);
      // this.autocomplte = state.autocompletedResults as any;
      // this.results = state.results;
      // const rs = formatResult(state.results);
      // let js = JSON.stringify(this.res);

      // const results = state.results as any;
      // const auto = state.autocompletedResults as any;
      // let json: string = JSON.stringify(state.results[0]);
      this.productItem = Object.assign(new ProductItem(), state.results);
      this.facetItem = Object.assign(new FacetItem(), state.facets);

      // this.faceevent.emit(this.facetItem);
      // this.productevent.emit(this.productItem);
      this.service.productSubject.next(this.productItem);
      this.service.totalPages.next(state.totalPages);
      this.service.totalResults.next(state.totalResults);
      this.service.faceSubject.next(this.facetItem);

      // console.log(state.totalResults);
      // console.log(state.facets);
    });
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  menuicon = 'menu';
  hide: boolean = true;

  signOut(): void {
    // this.authService.signOut(true)
    // this.profile = new User();
    // this.service.userSubject.next(this.profile);
    // this.loggedIn = false;
  }

  reactiveForm() {
    this.searchForm = this.fb.group({
      searchfield: [''],
    });
  }

  sendSearchTerm() {
    this.searchevent.emit(this.searchForm.get('searchfield')?.value);
    this.service.searchSubject.next(this.searchForm.get('searchfield')?.value);
    // this.service.postQueryLog(this.searchForm.get('searchfield')?.value,this.profile.id==""?'':this.profile.id).subscribe(data=>{console.log(data)})
    // console.log(this.profile == null ? 'dd' : this.profile.id);
  }

  submitForm() {
    // this.setSuggestions($e.target);
    this.service.searchSubject.next(this.searchInput.value as string);

    this.driver.getActions().setSearchTerm(
      this.searchInput.value as string
      //  {
      // autocompleteResults: true,
      // autocompleteSuggestions: true,
      // refresh: true,
      // }
    );
    // console.log('my serach: ', this.searchForm.get('searchfield')?.value);

    // if (this.searchForm.get('searchfield')?.value) {
    //   this.sendSearchTerm();
    //   this.getProducts();
    // let userId=""
    // if (this.user)
    //   userId=this.user.id
    // this.service.postQueryLog(this.searchForm.get('searchfield')?.value,userId)
    // }
    // console.log(this.product);
    // this.searchForm.get('searchfield')?.setValue('');
  }

  getProducts() {
    this.service
      .getProductBySearch(
        this.searchForm.get('searchfield')?.value,
        '0',
        this.profile.id
      )
      .subscribe((data: Product) => {
        // console.log('search count', data.count);
        // this.product = data;
        // if (data.products.length > 1) {
        this.service.productSubject.next(this.productItem[0]);
        this.service.searchSubject.next(
          this.searchForm.get('searchfield')?.value
        );
        // }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.subscription.unsubscribe();
  }

  openSigninDialog() {
    // if (this.user) {
    // const dialogRef = this.dialog.open(SignindialogComponent, {
    //   // height: '400px',
    //   width: '600px',
    // });
    // }
    // this.refreshToken()
    // console.log(`Dialog result:`);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onNavClicked() {
    if (this.menuicon == 'menu') {
      this.service.navSubject.next(true);
      this.menuicon = 'close';
      // this.navState = true
    } else {
      this.service.navSubject.next(false);
      this.menuicon = 'menu';
      // this.navState = true
    }
    this.service.trendSubject.next(false);
  }

  onWardrobeClicked() {
    this.service.navSubject.next(false);
    this.service.trendSubject.next(false);
  }

  onGetMoneyBackClicked() {
    const dialogRef = this.dialog.open(InformationdialogComponent, {
      width: '400px',
      data: { productid: '' },
    });

    this.service.trendSubject.next(false);
    this.service.navSubject.next(false);
  }

  onGenderClicked(gender: string) {
    this.service.maleFemaleSubject.next(gender);
    const search =
      gender == 'male'
        ? (this.searchInput.value as string) +
          ' ' +
          "man man's men men's male guy dude masculine youth " +
          'fellow gent son bloke chap geezer lad gentleman he'
        : gender == 'female'
        ? (this.searchInput.value as string) +
          ' ' +
          "woman woman's female females women women's lady ladies sister sister's frail frail's lass lassie " +
          'collen wife wifie gal Jane Judy dame broad frail maid maiden feminine' +
          'demoiselle gentlewoman she'
        : (this.searchInput.value as string);
    this.service.searchSubject.next(search);
    this.driver.getActions().setSearchTerm(search);
  }
}
