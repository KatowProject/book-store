import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CategoryManagementModalComponent } from '../category-management-modal/category-management-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categories: any = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Loading...'
    }).then(loading => {
      loading.present();
    });


    this.getAllCategories()
  }

  async getAllCategories() {
    try {
      const res = await fetch(environment.BASE_URL + 'api/admin/categories', {
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

      this.categories = data.data;

      this.loadingController.dismiss();
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

  add() {
    this.modalController.create({
      component: CategoryManagementModalComponent,
      componentProps: {
        type: 'add'
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this.getAllCategories();
      });
    });
  }

  edit(item: any) {
    this.modalController.create({
      component: CategoryManagementModalComponent,
      componentProps: {
        type: 'edit',
        item
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this.getAllCategories();
      });
    });
  }


  async remove(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Apakah kamu yakin ingin menghapus kategori ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Hapus',
          handler: async () => {
            const res = await fetch(environment.BASE_URL + 'api/admin/categories/' + item.id, {
              method: 'DELETE',
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
            }

            );

            this.toastController.create({
              message: 'Berhasil menghapus kategori',
              duration: 2000
            }).then(toast => {
              toast.present();
            });

            this.getAllCategories();
          }
        }
      ]
    });

    await alert.present();

  }

  back() {
    window.history.back();
  }
}
