import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  form: any = {};
  img: any;
  categories: any;


  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Loading...',
      spinner: 'dots'
    }).then((loading) => {
      loading.present();
      this.getAllCategories();
    });
  }

  async getAllCategories() {
    const response = await fetch(`${environment.BASE_URL}api/admin/categories`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const json = await response.json();
    this.categories = json.data;

    this.loadingController.dismiss();
  }

  loadImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.form.image = reader.result as string;
      this.img = file;
    }

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  async save() {
    try {
      if (this.form.name === '' || this.form.price === '' || this.form.stock === '' || this.form.description === '' || this.form.category_id === '' || this.form.publisher === '' || this.form.author === '' || this.form.total_page === '' || this.form.status === '') {
        this.alertController.create({
          header: 'Error',
          message: 'Please fill all the fields',
          buttons: ['OK']
        }).then(alert => alert.present());
        return;
      }

      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('price', this.form.price);
      formData.append('stock', this.form.stock);
      formData.append('description', this.form.description);
      formData.append('image', this.img);
      formData.append('category_id', this.form.category_id);
      formData.append('publisher', this.form.publisher);
      formData.append('author', this.form.author);
      formData.append('total_page', this.form.total_page);
      formData.append('status', this.form.status);
      formData.append('language', this.form.language);

      const response = await fetch(`${environment.BASE_URL}api/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData
      });

      const json = await response.json();
      if (json.statusCode !== 200) {
        this.alertController.create({
          header: 'Error',
          message: json.message,
          buttons: ['OK']
        }).then(alert => alert.present());
      }

      this.alertController.create({
        header: 'Success',
        message: json.message,
        buttons: ['OK']
      }).then(alert => alert.present());

      this.modalController.dismiss({
        dismissed: true
      });
    } catch (error: any) {
      this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
