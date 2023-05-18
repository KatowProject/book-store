import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PlaceorderModalComponent } from '../placeorder-modal/placeorder-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  data: any;
  total = 0;

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.getAllProductOnCart();
  }

  async getAllProductOnCart() {
    try {
      const res = await fetch(AppComponent.BASE_URL + 'api/get-cart', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        this.data = data.data;

        for (const item of this.data) {
          item.total = item.product.price * item.quantity;
          item.product.image = AppComponent.BASE_URL + 'images/' + item.product.image;

          // if name of product is more than 6 character, then add ... at the end of the name
          if (item.product.name.length > 6) {
            item.product.name = item.product.name.substring(0, 6) + '...';
          }

          this.total += item.total;
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async decreaseQuantity(item: any) {
    try {
      const res = await fetch(AppComponent.BASE_URL + 'api/add-to-cart', {
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
      const res = await fetch(AppComponent.BASE_URL + 'api/add-to-cart', {
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

  async ModalPlaceOrder() {
    const modal = await this.modalController.create({
      component: PlaceorderModalComponent,
    });

    modal.present();
  }

}
