import {Component, OnInit} from '@angular/core';
import {EditorChoiceBrand} from "../model/app-model";
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-editorchoice',
  templateUrl: './editorchoice.component.html',
  styleUrls: ['./editorchoice.component.css']
})
export class EditorchoiceComponent implements OnInit {
  editors: EditorChoiceBrand =new EditorChoiceBrand();

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
  }

}
