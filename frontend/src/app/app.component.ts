import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public me: any;
  public appPages = [
    // user pages
    { title: 'Home', url: '/folder/Home', icon: 'home', role: 'user' },
    { title: 'Category', url: '/category', icon: 'list', role: 'user' },
    { title: 'Orders', url: '/folder/Orders', icon: 'cart', role: 'user' },

    // admin pages
    { title: 'Products', url: '/folder/Products', icon: 'cube', role: 'admin' },
    { title: 'Users', url: '/folder/Users', icon: 'people', role: 'admin' },
    { title: 'Orders Management', url: '/folder/OrdersManagement', icon: 'cart', role: 'admin' },
    { title: 'Categories', url: '/admin/category', icon: 'list', role: 'admin' },
  ];

  constructor(private route: Router, private alertController: AlertController) {
  }

  async ngOnInit() {
    console.log('BASE_URL', environment.BASE_URL);
    const me = await this.getMe();

    // filter appPages by role
    this.appPages = this.appPages.filter(page => {
      if (page.role === 'admin' && me.data.role === 'admin') return true;
      if (page.role === 'user' && me.data.role === 'user') return true;
      return false;
    });
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
    const res = await fetch(environment.BASE_URL + 'api/users/me', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await res.json();
    if (data.statusCode === 200) {
      this.me = data.data;
    }

    return data;
  }
}
