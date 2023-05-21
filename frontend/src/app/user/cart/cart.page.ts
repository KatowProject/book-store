import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { PlaceorderModalComponent } from '../placeorder-modal/placeorder-modal.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  data: any;
  total = 0;
  placeOrderDisabled = true;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getAllProductOnCart();
  }

  async getAllProductOnCart() {
    try {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();


      const res = await fetch(environment.BASE_URL + 'api/get-cart', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const data = await res.json();
      this.data = data.data;

      if (data.statusCode !== 200) return this.alertController.create({
        header: 'Error',
        message: this.data.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      if (this.data.length > 0) this.placeOrderDisabled = false;
      for (const item of this.data) {
        item.total = item.product.price * item.quantity;
        item.product.image = environment.BASE_URL + 'images/' + item.product.image;

        // if name of product is more than 6 character, then add ... at the end of the name
        if (item.product.name.length > 25) {
          item.product.name = item.product.name.substring(0, 25) + '...';
        }

        this.total += item.total;
      }

      await loading.dismiss();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async decreaseQuantity(item: any) {
    try {
      const res = await fetch(environment.BASE_URL + 'api/add-to-cart', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "product_id": item.product.id,
          "quantity": -1
        })
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        this.total = 0;
        // get all product on cart
        this.getAllProductOnCart();
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async increaseQuantity(item: any) {
    try {
      const res = await fetch(environment.BASE_URL + 'api/add-to-cart', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "product_id": item.product.id,
          "quantity": 1
        })
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        // reset total
        this.total = 0;
        // get all product on cart
        this.getAllProductOnCart();
      } else {
        this.alertController.create({
          header: 'Error',
          message: data.message,
          buttons: ['OK']
        }).then(alert => {
          alert.present();
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

  async removeFromCart(item: any) {
    const res = await fetch(environment.BASE_URL + `api/remove-from-cart/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await res.json();
    if (data.statusCode === 200) {
      // reset total
      this.total = 0;
      // get all product on cart
      this.getAllProductOnCart();
    }
  }
  async ModalPlaceOrder() {
    // set data to pass to modal
    const modal = await this.modalController.create({
      component: PlaceorderModalComponent,
      componentProps: {
        total: this.total,
        data: this.data
      }
    });

    modal.present();
  }

  back() {
    window.history.back();
  }
}
