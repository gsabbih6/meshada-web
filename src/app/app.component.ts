import {
  Component,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  NavigationStart,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './animations';
import { AppServiceService } from './app-service.service';

declare let gtag: Function;
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [slideInAnimation],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  setFacet($event: import('./viewformat').FacetItem & Record<string, any>) {
    throw new Error('Method not implemented.');
  }
  title = 'stylsAngular';
  searchTerm: string = '';
  opennav!: boolean;
  opencol!: boolean;

  constructor(private router: Router, private service: AppServiceService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        // console.log('i was refreshed')
        // trigger refresh login
        this.service.refreshSubject.next(browserRefresh);
      }
    });
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // this.setUpAnalytics();
  }

  ngOnInit() {
    // this.setUpAnalytics();

    // this.service.navSubject.subscribe((state) => {
    //   this.opennav = state;
    // })
    this.service.trendSubject.subscribe((state) => {
      this.opencol = state;
    });
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  setUpAnalytics() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('set', 'page', event.urlAfterRedirects);
        gtag('send', 'pageview');
      }
    });
  }

  receiveMessage($event: string) {
    this.searchTerm = $event;
  }

  hotsChanged($event: boolean) {
    // this.service.navSubject.next($event)
  }

  onBackdropClicked() {
    this.service.backdropSubject.next(true);
    // console.log('backdroped');
  }
}
