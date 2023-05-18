import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  token: string | null;
  form = {
    username: '',
    password: ''
  }
  appComponent: AppComponent;
  constructor(private router: Router, private alertController: AlertController, private loadingController: LoadingController) {
    this.token = localStorage.getItem('token');
    this.appComponent = new AppComponent(router, alertController);
  }

  ngOnInit() {
    // check token on local storage
    this.checkToken();
  }

  checkToken() {
    if (!this.token) return;
    return new Promise(async (resolve, reject) => {
      console.log('check token');
      const res = await fetch(AppComponent.BASE_URL + 'api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      });
      const data = await res.json();

      if (data.statusCode === 200) {
        this.router.navigate(['/folder/Home']);
        return resolve(true);
      }
    });
  }

  async login() {
    try {
      if (!this.form.username || !this.form.password) {
        this.alertController.create({
          header: 'Login Failed',
          message: 'Username or password is must be filled',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        return;
      }

      const loading = await this.loadingController.create({
        message: 'Loading...'
      });

      loading.present();

      const res = await fetch(AppComponent.BASE_URL + 'api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.form.username,
          password: this.form.password
        })
      })

      const data = await res.json();
      if (data.statusCode != 200) {
        this.alertController.create({
          header: 'Login Failed',
          message: 'Username or password is incorrect',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });

        loading.dismiss();
        return;
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user_id', data.data.user_id);
      loading.dismiss();

      this.alertController.create({
        header: 'Login Success',
        message: 'You have been logged in',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      window.location.href = '/folder/Home';

    } catch (err) {
      this.alertController.create({
        header: 'Login Failed',
        message: 'Username or password is incorrect',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }
}
