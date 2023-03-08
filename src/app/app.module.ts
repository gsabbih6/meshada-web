import { ProductCardComponent } from './product-card/product-card.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImagegalleryComponent } from './imagegallery/imagegallery.component';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { CollectionComponent } from './collection/collection.component';
import { TrendingComponent } from './trending/trending.component';
import { PromotedComponent } from './promoted/promoted.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
// import {LiveTVComponent} from './live-tv/live-tv.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { AnimationImgComponent } from './animation-img/animation-img.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import {NgxFlickingModule} from '@egjs/ngx-flicking';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CommerceComponent } from './commerce/commerce.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { SignindialogComponent } from './signindialog/signindialog.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HelpComponent } from './help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppServiceService } from './app-service.service';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { WardropedialogComponent } from './wardropedialog/wardropedialog.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InformationdialogComponent } from './informationdialog/informationdialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CacheInterceptor } from './Interceptors';
// import { ScullyLibModule } from '@scullyio/ng-lib';
// import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { AdsenseModule } from 'ng2-adsense';
// import { ScullyLibModule } from '@scullyio/ng-lib';
import { HomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewtrendComponent } from './newtrend/newtrend.component';
import { SearchDescComponent } from './search-desc/search-desc.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { EditorchoiceComponent } from './editorchoice/editorchoice.component';
import { ActionComponent } from './action/action.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdsDisclosureComponent } from './ads-disclosure/ads-disclosure.component';
// import { NgxInfiniteGridModule } from '@egjs/ngx-infinitegrid';
import { ExploreComponent } from './explore/explore.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AccountComponent } from './account/account.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagegalleryComponent,
    HomeGalleryComponent,
    CollectionComponent,
    TrendingComponent,
    PromotedComponent,
    ProfilePageComponent,
    // LiveTVComponent,
    SideNavigationComponent,
    AnimationImgComponent,
    AboutusComponent,
    CommerceComponent,
    SignindialogComponent,
    WishlistComponent,
    HelpComponent,
    WardrobeComponent,
    WardropedialogComponent,
    InformationdialogComponent,
    HomeComponent,
    NewtrendComponent,
    SearchDescComponent,
    FooterComponent,
    EditorchoiceComponent,
    ActionComponent,
    PageNotFoundComponent,
    AdmindashboardComponent,
    AdsDisclosureComponent,
    ExploreComponent,
    AccountComponent,
    LandingPageComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    // NgxInfiniteGridModule,
    InfiniteScrollModule,
    ScrollingModule,
    AdsenseModule.forRoot(),
    // MatCarouselModule.forRoot(),
    MatTooltipModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatTreeModule,
    MatMenuModule,
    // ImagekitioAngularModule.forRoot({
    //   publicKey: "public_b/ubKZvoRu7u75A/HJtVjIsARG4=",
    //   urlEndpoint: "https://ik.imagekit.io/8vky2ggldr3/",
    //   // authenticationEndpoint: environment.authenticationEndpoint
    // }),
    MatRippleModule,
    MatSidenavModule,
    ClipboardModule,
    // ScullyLibModule,
    SocialLoginModule,
  ],
  providers: [
    AppServiceService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // '306603819268-ljotdcvqcvr23bi7jhhug2olqfmi0059.apps.googleusercontent.com' //main
              '306603819268-8bojtst29m1qm0q6aahd0ecabderdord.apps.googleusercontent.com' //test
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3033127066954710'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    // ProductService,
    // // SidenavServiceService,
    // UserserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
