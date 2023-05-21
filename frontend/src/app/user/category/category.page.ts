import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FolderPage } from './../../folder/folder.page';
import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { environment } from 'src/environments/environment.prod';
import { OrderdetailModalComponent } from '../orderdetail-modal/orderdetail-modal.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

register();

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  cart: any;
  data: any;

  constructor(
    private folderPage: FolderPage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    this.loadingController.create({
      message: 'Loading...'
    }).then(loading => {
      loading.present();
    });


    this.folderPage.getCartLength().then(cart => {
      this.cart = this.folderPage.cart;
    });

    this.getAllProductsByCategory();
  }

  async getAllProductsByCategory() {
    const res = await fetch(environment.BASE_URL + 'api/products/categories', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await res.json();
    if (data.statusCode !== 200) return this.alertController.create({
      header: 'Error',
      message: data.message,
      buttons: ['OK']
    }).then(alert => {
      alert.present();
    });

    this.data = data.data;

    this.loadingController.dismiss();
  }

  async addToCart(item: any) {
    try {
      const res = await fetch(environment.BASE_URL + 'api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          product_id: item.id,
          quantity: 1
        })
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        this.toastController.create({
          message: 'Berhasil menambahkan ke keranjang',
          duration: 2000,
        }).then(toast => {
          toast.present();
        });

        this.folderPage.getCartLength().then(cart => {
          this.cart = this.folderPage.cart;
        });
      }
    } catch (err: any) {
      this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }

  async productDetail(item: any, category: any) {
    item.category = category.name;
    const modal = await this.modalController.create({
      component: ProductDetailModalComponent,
      componentProps: {
        'item': item
      }
    });

    return await modal.present();
  }
}
