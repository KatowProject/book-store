import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-category-management-modal',
  templateUrl: './category-management-modal.component.html',
  styleUrls: ['./category-management-modal.component.scss'],
})
export class CategoryManagementModalComponent implements OnInit {
  @Input() item: any;
  @Input() type: any;

  form: any = {}

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.type === 'edit') {
      this.form = this.item;
    }
  }


  cancel() {
    this.modalController.dismiss();
  }

  save(): any {
    if (!this.form.name) return this.toastController.create({
      message: 'Nama kategori harus diisi',
      duration: 2000
    }).then(toast => {
      toast.present();
    });

    switch (this.type) {
      case 'add':
        this.createCategory();
        break;

      case 'edit':
        this.editCategory();
        break;
    }
  }

  async createCategory() {
    try {
      const res = await fetch(`${environment.BASE_URL}api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.form)
      });

      const json = await res.json();
      if (json.statusCode === 200) {
        this.toastController.create({
          message: 'Kategori berhasil ditambahkan',
          duration: 2000
        }).then(toast => {
          toast.present();
        });

        this.modalController.dismiss();
        return;
      }
    } catch (err) {
      this.toastController.create({
        message: 'Kategori gagal ditambahkan',
        duration: 2000
      }).then(toast => {
        toast.present();
      });

      this.modalController.dismiss();
      return;
    }
  }

  async editCategory() {
    try {
      const res = await fetch(`${environment.BASE_URL}api/admin/categories/${this.item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.form)
      });

      const json = await res.json();
      if (json.statusCode === 200) {
        this.toastController.create({
          message: 'Kategori berhasil diubah',
          duration: 2000
        }).then(toast => {
          toast.present();
        });

        this.modalController.dismiss();
        return;
      }
    } catch (err) {
      this.toastController.create({
        message: 'Kategori gagal diubah',
        duration: 2000
      }).then(toast => {
        toast.present();
      });

      this.modalController.dismiss();
      return;
    }
  }
}
