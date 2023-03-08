import {Component, OnInit, Input} from '@angular/core';
// import {Fade, AutoPlay} from '@egjs/flicking-plugins';
// import {Plugin} from '@egjs/flicking';

@Component({
  selector: 'app-animation-img',
  templateUrl: './animation-img.component.html',
  styleUrls: ['./animation-img.component.css'],
})
export class AnimationImgComponent implements OnInit {
  @Input() image_urls: string[] = [];
  @Input() description: string = "";
  // plugins: Plugin[] = [
  //   // new Fade(),
  //   new AutoPlay({duration: 2000, direction: 'NEXT', stopOnHover: false}),
  // ];
  transform = [
    {
      height: 250,
      width: 200,
      focus: "auto"
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  startAnimation() {
  }
}
