import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { RouterModule } from '@angular/router';
import { CreatePackage } from './createPackage.component'
import { CreateDelivery } from './createDelivery.component'
import { AdminPackageComponent } from './adminPackage.component'

@NgModule({
  declarations: [
    AppComponent,
    CreatePackage,
    AdminPackageComponent,
    CreateDelivery
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    RouterModule.forRoot([
      {path: 'create-package', component: CreatePackage },
      {path: 'create-delivery', component: CreateDelivery },
      {path: 'home', component: AdminPackageComponent },
      {path: '', component: AppComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
