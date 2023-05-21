import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  form: any = {}

  constructor(private modalController: ModalController, private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() { }

  async save() {
    if (!this.form.name || !this.form.email || !this.form.password || !this.form.role) {
      this.alertController.create({
        header: 'Add User Failed',
        message: 'All fields must be filled',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
      return;
    }

    this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
    }).then(loading => {
      loading.present();
    });

    const res = await fetch(`${environment.BASE_URL}api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(this.form)
    });

    const json = await res.json();
    if (json.statusCode === 200) {
      this.alertController.create({
        header: 'Add User Success',
        message: 'User has been added',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      this.modalController.dismiss();
      this.loadingController.dismiss();

      return;
    }

    this.alertController.create({
      header: 'Add User Failed',
      message: json.message.email,
      buttons: ['OK']
    }).then(alert => {
      alert.present();
      this.loadingController.dismiss();
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
