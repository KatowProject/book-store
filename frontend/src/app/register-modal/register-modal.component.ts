import { Router } from '@angular/router';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  form = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private alertController: AlertController, private router: Router, private modalController: ModalController, private loadingController: LoadingController) { }

  ngOnInit() { }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'dots'
    });

    await loading.present();


    const res = await fetch(environment.BASE_URL + 'api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.form)
    });

    const json = await res.json();
    if (json.statusCode !== 201) return this.alertController.create({
      header: 'Register Failed',
      message: json.message,
      buttons: ['OK']
    }).then((alert) => alert.present());

    this.alertController.create({
      header: 'Register Success',
      message: json.message,
      buttons: ['OK']
    }).then((alert) => {
      alert.present();

      this.modalController.dismiss();

    });

    await loading.dismiss();
  }
}
