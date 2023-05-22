import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  @Input() item: any;
  form: any = {}
  categories: any;
  img: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    }).then(loading => loading.present());

    this.form.name = this.item.name;
    this.form.price = this.item.price;
    this.form.stock = this.item.stock;
    this.form.description = this.item.description;
    this.form.image = this.item.image;
    this.form.category_id = this.item.category_id;
    this.form.publisher = this.item.publisher;
    this.form.author = this.item.author;
    this.form.total_page = this.item.total_page;
    this.form.status = this.item.status;
    this.form.language = this.item.language;

    this.getAllCategories();
  }

  async getAllCategories() {
    const response = await fetch('http://localhost:8000/api/admin/categories', {
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
      // text validation
      if (this.form.name === '' || this.form.price === '' || this.form.stock === '' || this.form.description === '' || this.form.category_id === '' || this.form.publisher === '' || this.form.author === '' || this.form.total_page === '' || this.form.status === '') {
        this.alertController.create({
          header: 'Error',
          message: 'Please fill all the fields',
          buttons: ['OK']
        }).then(alert => alert.present());
        return;
      }

      // if image is not changed
      if (this.form.image === this.item.image) {
        delete this.form.image;
        const response = await fetch(`${environment.BASE_URL}api/admin/products/${this.item.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(this.form)
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

      } else {
        // if image is changed
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

        const response = await fetch(`${environment.BASE_URL}api/admin/products/${this.item.id}`, {
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
      }

      this.modalController.dismiss({
        dismissed: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
