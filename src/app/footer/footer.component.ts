import { Component, OnInit } from '@angular/core';
import {SignindialogComponent} from "../signindialog/signindialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdsDisclosureComponent} from "../ads-disclosure/ads-disclosure.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onAdsClicked() {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(AdsDisclosureComponent,
      {
        // height: '300px',
        width: '600px'
      });
  }
}
