import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FolderPage } from 'src/app/folder/folder.page';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent implements OnInit {
  @Input() item: any;

  constructor(private modalController: ModalController, private toastController: ToastController, private alertController: AlertController, private folderPage: FolderPage) { }

  ngOnInit() {
    console.log(this.item);
  }

  cancel() {
    this.modalController.dismiss();
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

        this.folderPage.getCartLength();
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
}
