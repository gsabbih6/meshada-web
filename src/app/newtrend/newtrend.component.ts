import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {Discover} from "../model/app-model";

@Component({
  selector: 'app-newtrend',
  templateUrl: './newtrend.component.html',
  styleUrls: ['./newtrend.component.css']
})
export class NewtrendComponent implements OnInit {
  discover: Discover[] = [];

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.getDiscover();
  }

  private getDiscover() {
    this.service.getDiscover().subscribe((data) => {
      this.discover = data;
    })
  }
}
