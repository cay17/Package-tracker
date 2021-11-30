import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './createDelivery.component.html',
  styleUrls: ['./createDelivery.component.css']
})

export class CreateDelivery implements OnInit {

  packages: any = []
  constructor(private httpClient: HttpClient, private route: Router) { }

  ngOnInit () {
    this.httpClient
      .get('http://localhost:3000/api/package')
      .subscribe(
        (response) => {
          this.packages = response
        },
        (error) => {
          console.log(error)
        }
      )
  }
  submit(form: NgForm) {
    console.log(form.value.package_id)
    this.httpClient
      .post('http://localhost:3000/api/delivery/', {
        ...form.value,
        status: 'open'
      })
      .subscribe(
        (response: any) => {
          this.httpClient
            .put('http://localhost:3000/api/package/' + form.value.package_id, {
              active_delivery_id: response._id
            })
            .subscribe(
              () => {
                this.route.navigate(['/home'])
              },
              (error) => {
                console.log(error)
              }
            )
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
