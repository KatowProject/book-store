import { ModalController, LoadingController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  @Input() item: any;
  form = {
    name: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    category_id: '',
    publisher: '',
    author: '',
    total_page: '',
    status: ''
  }
  categories: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController) { }

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

      console.log(this.form.image);
    }

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  async save() {

  }

  cancel() {
    this.modalController.dismiss();
  }
}
