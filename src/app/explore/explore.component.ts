import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent implements OnInit, AfterViewInit {
  items: any[] = [];
  count = 0;

  constructor(private service: AppServiceService) {}
  ngAfterViewInit(): void {
    this.getItems(this.count);
    this.service.homeSubject.next(false);
  }

  getItems(nextGroupKey: number) {
    this.service.getAllProducts(nextGroupKey).subscribe((data) => {
      this.items.push(...data.products);
    });
  }

  // groupBy(_: any, item: any) {
  //   return item.groupKey;
  // }
  //
  // trackBy(_: any, item: any) {
  //   return item.key.id;
  // }

  // async onRequestAppend(e: OnRequestAppend) {
  //   const nextGroupKey = (+e.groupKey! || 0) + 1;
  //
  //   this.items = [
  //     ...this.items,
  //     ...await this.getItems(nextGroupKey),
  //   ];
  // }

  ngOnInit(): void {}

  onScroll() {
    console.log('scroll down');
    this.getItems(this.count++);
  }
}
