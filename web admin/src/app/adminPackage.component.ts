import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as io from 'socket.io-client';

@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './adminPackage.component.html',
  styleUrls: ['./adminPackage.component.css']
})

export class AdminPackageComponent implements OnInit {

  searchForm: any;
  socket: any = io.connect('http://localhost:3000/');
  title = 'Package';
  packages: any = {}
  deliveries: any = {}

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.httpClient
      .get('http://localhost:3000/api/package/')
      .subscribe(
        (response) => {
          this.packages = response
        },
        (error) => {
          console.log(error)
        }
      )

      this.httpClient
      .get('http://localhost:3000/api/delivery/')
      .subscribe(
        (response) => {
          this.deliveries = response
        },
        (error) => {
          console.log(error)
        }
      )
  }

  initForm () {
    this.searchForm = this.formBuilder.group({
      package_id: ''
    });
  }
}
