import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaceorderModalComponent } from './user/placeorder-modal/placeorder-modal.component';
import { FormsModule } from '@angular/forms';
import { OrderdetailModalComponent } from './user/orderdetail-modal/orderdetail-modal.component';
import { ProductDetailModalComponent } from './user/product-detail-modal/product-detail-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { EditProductModalComponent } from './admin/edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [AppComponent, PlaceorderModalComponent, OrderdetailModalComponent, ProductDetailModalComponent, RegisterModalComponent, EditProductModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent, PlaceorderModalComponent, OrderdetailModalComponent, ProductDetailModalComponent, RegisterModalComponent],
})
export class AppModule { }
