import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetail-modal',
  templateUrl: './orderdetail-modal.component.html',
  styleUrls: ['./orderdetail-modal.component.scss'],
})
export class OrderdetailModalComponent implements OnInit {
  @Input() item: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.item);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
