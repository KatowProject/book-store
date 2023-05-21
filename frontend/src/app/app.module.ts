import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AddProductModalComponent } from './admin/add-product-modal/add-product-modal.component';
import { EditUserModalComponent } from './admin/edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from './admin/add-user-modal/add-user-modal.component';
import { FolderPage } from './folder/folder.page';

@NgModule({
  declarations: [
    AppComponent,
    PlaceorderModalComponent,
    OrderdetailModalComponent,
    ProductDetailModalComponent,
    RegisterModalComponent,
    EditProductModalComponent,
    AddProductModalComponent,
    EditUserModalComponent,
    AddUserModalComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FolderPage],
  bootstrap: [AppComponent, PlaceorderModalComponent, OrderdetailModalComponent, ProductDetailModalComponent, RegisterModalComponent, FolderPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
