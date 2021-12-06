import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as io from 'socket.io-client';

@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  searchForm: any;
  socket: any;
  title = 'Package';
  package_id: String = '';
  package: any = {}
  delivery: any = {}

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.socket = new WebSocket('ws://localhost:3000/ws');
    this.socket.onmessage = (msg: any) => {
      console.log(msg)
      const message = JSON.parse(msg.data)
      if (message.event === "delivery_updated") {
        if (message.delivery_object._id === this.delivery._id) {
          this.delivery = message.delivery_object
          this.delivery.location.lat = parseFloat(this.delivery.location.lat)
          this.delivery.location.lng = parseFloat(this.delivery.location.lng)
        }
      }
    }
  }

  initForm () {
    this.searchForm = this.formBuilder.group({
      package_id: ''
    });
  }
  searchPackage (form: NgForm) {
    this.httpClient
      .get('http://localhost:3000/api/package/' + form.value.package_id)
      .subscribe(
        (response) => {
          this.package = response
          if(this.package.active_delivery_id) {
            this.getDelivery(this.package.active_delivery_id)
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getDelivery (id: Number) {
    this.httpClient
      .get('http://localhost:3000/api/delivery/' + id)
      .subscribe(
        (response) => {
          this.delivery = response
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
