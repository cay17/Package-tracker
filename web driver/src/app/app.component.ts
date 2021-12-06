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
    this.socket = new WebSocket('ws://localhost:3000/ws');
    this.socket.onmessage = (msg: any) => {
      const message = JSON.parse(msg.data)
      if (message.event === "delivery_updated") {
        if (message.delivery_object._id === this.delivery._id) {
          this.delivery = message.delivery_object
          this.delivery.location.lat = parseFloat(this.delivery.location.lat)
          this.delivery.location.lng = parseFloat(this.delivery.location.lng)
          this.sendLocation()
        }
      }
    }
  }

  sendLocation () {
    if (this.delivery.status && this.delivery.status !== 'open') {
      setInterval( () => {
        let location: any
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(parseFloat(position.coords.latitude.toString()))
            location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            const obj = {
              event: 'location_changed',
              location: location,
              delivery_id: this.delivery._id
            }
            this.socket.send(JSON.stringify(obj))
          }, (error) => {
            console.log(error)
          });
        }
      }, 5000)
    }
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
    const obj = {
      event: 'status_changed',
      status: status,
      delivery_id: this.delivery._id
    }
    this.socket.send(JSON.stringify(obj))
    this.sendLocation()
  }

  getDelivery (id: Number) {
    this.httpClient
      .get('http://localhost:3000/api/delivery/' + id)
      .subscribe(
        (response) => {
          this.delivery = response
          this.sendLocation()
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
