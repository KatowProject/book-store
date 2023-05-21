import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  @Input() item: any;
  form: any = {}

  constructor(private alertController: AlertController, private loadingController: LoadingController, private modalController: ModalController) {
  }

  ngOnInit() {
    this.form.name = this.item.name;
    this.form.email = this.item.email;
    this.form.role = this.item.role;
  }

  async save() {
    try {
      this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
      }).then(loading => {
        loading.present();
      });

      // if password is empty, don't send it
      if (this.form.password === '') delete this.form.password;

      const res = await fetch(`${environment.BASE_URL}api/admin/users/${this.item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.form)
      });

      const json = await res.json();
      if (json.statusCode === 200) {
        this.alertController.create({
          header: 'Edit User Success',
          message: 'User has been edited',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });

        this.modalController.dismiss();
        this.loadingController.dismiss();

        return;
      }

      this.alertController.create({
        header: 'Edit User Failed',
        message: json.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    } catch (error: any) {
      this.alertController.create({
        header: 'Edit User Failed',
        message: error.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
