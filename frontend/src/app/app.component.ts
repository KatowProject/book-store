import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public me: any;
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  static BASE_URL = 'http://localhost:8000/';

  constructor(private route: Router, private alertController: AlertController) {

  }

  ngOnInit() {
    console.log('BASE_URL', AppComponent.BASE_URL);
    this.getMe();
  }

  logout() {
    this.alertController.create({
      header: 'Logout',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');

            this.route.navigate(['/login']);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  async getMe() {
    if (!localStorage.getItem('token')) return;
    const res = await fetch(AppComponent.BASE_URL + 'api/users/me', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await res.json();
    if (data.statusCode === 200) {
      this.me = data.data;
    }
  }
}
