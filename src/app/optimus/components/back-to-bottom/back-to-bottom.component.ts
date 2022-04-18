import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { log } from 'console';

@Component({
  selector: 'app-back-to-bottom',
  templateUrl: './back-to-bottom.component.html',
  styleUrls: ['./back-to-bottom.component.css']
})
export class BackToBottomComponent implements OnInit {

  constructor(
    private _location : Location
  ) { }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
