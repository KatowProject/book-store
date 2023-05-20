import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaceorderModalComponent } from './placeorder-modal/placeorder-modal.component';
import { FormsModule } from '@angular/forms';
import { OrderdetailModalComponent } from './orderdetail-modal/orderdetail-modal.component';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@NgModule({
  declarations: [AppComponent, PlaceorderModalComponent, OrderdetailModalComponent, ProductDetailModalComponent, RegisterModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent, PlaceorderModalComponent, OrderdetailModalComponent, ProductDetailModalComponent, RegisterModalComponent],
})
export class AppModule { }
