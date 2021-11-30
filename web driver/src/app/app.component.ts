import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Status } from '../utils'

@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  socket: any;
  title = 'Package';
  package_id: String = '';
  package: any = {}
  delivery: any = {}
  StatusEnum = Status

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    setInterval( () => {
      let location: any
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }, (error) => {
          console.log(error)
        });
      }
    }, 5000)
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

  changeStatus (status: Status) {
    this.delivery.status = status
    this.socket.emit('status_changed', status)
  }

  getDelivery (id: Number) {
    this.httpClient
      .get('http://localhost:3000/api/delivery/' + id)
      .subscribe(
        (response) => {
          console.log(response)
          this.delivery = response
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
