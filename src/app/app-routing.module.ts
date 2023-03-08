import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CommerceComponent } from './commerce/commerce.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { PreloadAllModules } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ActionComponent } from './action/action.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExploreComponent } from './explore/explore.component';
// import { AdsenseModule } from 'ng2-adsense';
const routes: Routes = [
  { path: 'aboutus', component: AboutusComponent },
  { path: 'index', component: HomeComponent },
  { path: 'action/:id', component: ActionComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'wardrobe', component: WardrobeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'legal/:id', component: HelpComponent },
  { path: 'store', component: CommerceComponent },
  // { path: '', redirectTo: '/index', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
