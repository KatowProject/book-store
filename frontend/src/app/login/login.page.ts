import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
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
  constructor(private router: Router, private alertController: AlertController, private loadingController: LoadingController, private modalController: ModalController) {
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
        // check role
        if (data.data.role === 'admin')
          window.location.href = '/admin';
        else
          window.location.href = '/folder/Home';

      }
    });
  }

  async login(isAdmin = false) {
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
      });

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

      if (isAdmin && data.data.role !== 'admin') {
        this.alertController.create({
          header: 'Login Failed',
          message: 'You are not admin',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });

        loading.dismiss();

        return;
      }

      // check role
      if (!isAdmin && data.data.role === 'admin') {
        this.alertController.create({
          header: 'Login Failed',
          message: 'You are not user',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });

        loading.dismiss();

        return;
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user_id', data.data.id);
      loading.dismiss();

      this.alertController.create({
        header: 'Login Success',
        message: 'You have been logged in',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      if (isAdmin)
        window.location.href = '/folder/Admin';
      else
        window.location.href = '/folder/Home';

    } catch (err) {
      this.alertController.create({
        header: 'Login Failed',
        message: 'Username or password is incorrect',
        buttons: ['OK']
      }).then(alert => {
        this.loadingController.dismiss();
        alert.present();
      });
    }
  }

  async registerModal() {
    const modal = await this.modalController.create({
      component: RegisterModalComponent
    });

    modal.present();
  }

  async register() {
    try {
      if (!this.form.username || !this.form.password) {
        this.alertController.create({
          header: 'Register Failed',
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

      const res = await fetch(AppComponent.BASE_URL + 'api/register', {
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
          header: 'Register Failed',
          message: 'Username or password is incorrect',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });

        loading.dismiss();
        return;
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user_id', data.data.id);
      loading.dismiss();

      this.alertController.create({
        header: 'Register Success',
        message: 'You have been registered',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

      window.location.href = '/folder/Home';

    } catch (err) {
      this.alertController.create({
        header: 'Register Failed',
        message: 'Username or password is incorrect',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }
}
