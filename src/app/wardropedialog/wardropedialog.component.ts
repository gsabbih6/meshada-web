import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Item, Wardrobe, WardrobeDetail } from '../model/app-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wardropedialog',
  templateUrl: './wardropedialog.component.html',
  styleUrls: ['./wardropedialog.component.css'],
})
export class WardropedialogComponent implements OnInit {
  public wardrobes: WardrobeDetail[] = [];
  name: string = '';
  userid: string = '';
  wardForm!: FormGroup;
  error: boolean = false;
  close: boolean = false;
  private item!: Item;

  constructor(
    private service: AppServiceService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { itemid: string }
  ) {}

  ngOnInit(): void {
    this.wardForm = this.fb.group({
      name: [''],
      visibility: [''],
    });
    this.service.userSubject.subscribe((user) => {
      // if (user != null)
      this.userid = user.id;
    });
    this.service.wardrobeSubject.subscribe((data) => {
      this.wardrobes = data;
      // console.log(data[0].wardrobe.productids.includes(this.data.itemid))
    });
  }

  addwardrobe() {
    if (
      this.wardForm.get('name')?.value == '' ||
      this.wardForm.get('visibility')?.value == ''
    ) {
      this.error = true;
    } else {
      this.error = false;
      this.close = true;
      // console.log(this.userid)
      if (this.userid != null || this.userid != '')
        this.service
          .createNewWardrope(this.wardForm.get('name')?.value, this.userid)
          .subscribe((data) => {
            // add to dialog list
            this.wardrobes.push(data);
            // console.log(data)
          });
    }
  }

  addItem(change: MatCheckboxChange, wardrope: Wardrobe) {
    if (wardrope.productids == null) wardrope.productids = [];
    if (change.checked) {
      wardrope.productids.push(this.data.itemid);
      // console.log(wardrope)
    } else {
      wardrope.productids.splice(
        wardrope.productids.indexOf(this.data.itemid, 0),
        1
      );
    }

    this.service.updateWardrope(wardrope).subscribe((data) => {
      // notify wardrope component
      // console.log(data)
    });
  }

  isChecked(ward: WardrobeDetail) {
    if (ward.wardrobe.productids != null)
      return ward.wardrobe.productids.includes(this.data.itemid);

    return false;
  }
}
