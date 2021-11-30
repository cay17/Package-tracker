import { Component, OnInit } from '@angular/core';
import { Injectable } from  '@angular/core';

import {Router} from '@angular/router';

@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
    this.route.navigate(['/home'])
  }
}
