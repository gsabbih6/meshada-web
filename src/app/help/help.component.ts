import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  cashbackFormControl!: FormGroup;
  terms = false;
  cookie = false;
  cashback = false;
  privacy = true;

  constructor(private route: ActivatedRoute,
              private router: Router, @Inject(DOCUMENT) private document: Document) {
    // let s = this.route.snapshot.paramMap.get('id')!
    // this.onOptionClicked(s, this.document.getElementById('target')!)
  }

  ngOnInit(): void {
    let s = this.route.snapshot.paramMap.get('id')!
    this.onOptionClicked(s, this.document.getElementById('target')!)
  }

  submitForm() {

  }

  onOptionClicked(s: string, el: HTMLElement) {
    if (s == 'terms') {
      this.terms = true;
      this.cookie = this.cashback = this.privacy = false;
    }
    if (s == 'cashback') {
      this.cashback = true;
      this.cookie = this.terms = this.privacy = false;
    }
    if (s == 'privacy') {
      this.privacy = true;
      this.cookie = this.terms = this.cashback = false;
    }
    if (s == 'cookie') {
      this.cookie = true;
      this.privacy = this.terms = this.cashback = false;
    }
    this.scrollToTop(el)
  }

  scrollToTop(el: HTMLElement) {
    el.scrollIntoView();
  }
}
