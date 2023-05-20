import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent implements OnInit {
  @Input() item: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.item);
  }

  cancel() {
    this.modalController.dismiss();
  }

  addToCart(item: any) { }
}
