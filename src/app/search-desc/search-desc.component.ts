import { AppServiceService } from './../app-service.service';
// import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-desc',
  templateUrl: './search-desc.component.html',
  styleUrls: ['./search-desc.component.css'],
})
export class SearchDescComponent implements OnInit {
  querystring: String = '';
  resultstat: String = 'Results for';
  showsorry: boolean = false;
  constructor(private service: AppServiceService) {}

  ngOnInit(): void {
    this.service.searchSubject.subscribe((data) => {
      this.querystring = data;
    });

    // this.service.productSubject.subscribe((data) => {
    //   if (data[0]._meta.rawHit. == 0) {
    //     this.resultstat = 'No Results for';
    //     this.showsorry = true;
    //   } else {
    //     this.resultstat = 'Results for';
    //     this.showsorry = false;
    //   }
    // });
  }
}
