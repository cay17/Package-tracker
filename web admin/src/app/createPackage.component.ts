import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
@Injectable()


  @Component({
  selector: 'app-root',
  templateUrl: './createPackage.component.html',
  styleUrls: ['./createPackage.component.css']
})

export class CreatePackage {

  constructor(private httpClient: HttpClient, private route: Router) { }

  submit(form: NgForm) {
    this.httpClient
      .post('http://localhost:3000/api/package/', form.value)
      .subscribe(
        (response) => {
          this.route.navigate(['/home'])
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
