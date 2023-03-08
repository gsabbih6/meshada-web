import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AppServiceService} from "../app-service.service";
import {SignindialogComponent} from "../signindialog/signindialog.component";

@Component({
  selector: 'app-ads-disclosure',
  templateUrl: './ads-disclosure.component.html',
  styleUrls: ['./ads-disclosure.component.css']
})
export class AdsDisclosureComponent implements OnInit {

  constructor(public dialog: MatDialog,private service: AppServiceService, @Inject(MAT_DIALOG_DATA) public data: { productid: string, producturl: string }) {
  }


  ngOnInit(): void {

  }

}
