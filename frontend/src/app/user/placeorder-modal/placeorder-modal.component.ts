import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-placeorder-modal',
  templateUrl: './placeorder-modal.component.html',
  styleUrls: ['./placeorder-modal.component.scss'],
})

export class PlaceorderModalComponent implements OnInit {
  // get cart data from cart.page.ts
  @Input() total: any;
  @Input() data: any;

  order = {
    name: '',
    address: '',
    phone_number: '',
    payment_method: '',
    post_code: '',
    total: 0,
  }

  constructor(private modalController: ModalController, private loadingController: LoadingController, private alertController: AlertController) {
  }

  ngOnInit() {
    this.order.total = this.total;
    console.log('ok')
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async confirm(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'lines',
      animated: true
    });

    await loading.present();

    const res = await fetch(environment.BASE_URL + 'api/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(this.order)
    });

    const data = await res.json();
    if (data.statusCode !== 200) {
      loading.dismiss();

      this.alertController.create({
        header: 'Error',
        message: data.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      return;
    }

    this.alertController.create({
      header: 'Success',
      message: 'Your order has been placed',
      buttons: ['OK']
    }).then(alert => {
      alert.present();
    });

    loading.dismiss();

    this.modalController.dismiss(null, 'confirm');
  }
}
