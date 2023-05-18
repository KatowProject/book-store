import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-placeorder-modal',
  templateUrl: './placeorder-modal.component.html',
  styleUrls: ['./placeorder-modal.component.scss'],
})

export class PlaceorderModalComponent {
  name = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.name, 'confirm');
  }
}
