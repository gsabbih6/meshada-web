import {Component, Inject, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SignindialogComponent} from "../signindialog/signindialog.component";
import {User} from "../model/app-model";

@Component({
  selector: 'app-informationdialog',
  templateUrl: './informationdialog.component.html',
  styleUrls: ['./informationdialog.component.css']
})
export class InformationdialogComponent implements OnInit {
  purchase!: boolean;
  redeem = true;
  store: any;
  code = '';
  copy = 'Copy & Proceed';
  user: User = new User();
  link: string = '';

  // constructor(public dialog: MatDialog, private service: AppServiceService, @Inject(MAT_DIALOG_DATA) public data: { productid: string, producturl: string }) {
  // }
  constructor(public dialog: MatDialog, private service: AppServiceService) {
  }

  // goToLink() {
  //   window.open(this.data.producturl, "_blank");
  // }

  ngOnInit(): void {
    // this.service.getPurchase(this.data.productid).subscribe((data) => {
    //   if (data != null) {
    //     this.code = data.id
    //     this.purchase = true;
    //     this.redeem = false;
    //
    //   } else {
    //
    //     this.redeem = true;
    //     this.purchase = false;
    //   }
    // })

    this.service.userSubject.subscribe((user) => {
      this.user = user;
    })
  }

  onSubscribeClicked() {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(SignindialogComponent,
      {
        height: '400px',
        width: '600px'
      });
  }

  onStripeClicked() {
    this.service.connectStripe(this.user.id).subscribe((link) => {
      console.log(link)
      window.open(link, "_self");
    })
  }
}
