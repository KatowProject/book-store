import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public data: any;
  public cart: any;

  private activatedRoute = inject(ActivatedRoute);

  // import loading controller
  constructor(private router: Router, private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.checkToken();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    switch (this.folder.toLowerCase()) {
      case 'home':
        this.getAllProducts();
        break;
    }
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      const a = this.alertController.create({
        header: 'Error',
        message: 'You must login first',
        buttons: ['OK']
      });

      // handler onclick ok navigate to login page
      a.then(alert => {
        alert.present();
        this.router.navigate(['/login']);
      })

    }

    return true;
  }

  async getAllProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    try {
      loading.present();

      const res = await fetch(AppComponent.BASE_URL + 'api/products', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const res_cart = await fetch(AppComponent.BASE_URL + 'api/get-cart', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const data_cart = await res_cart.json();
      const datas = await res.json();

      for (const data of datas.data) {
        data.image = AppComponent.BASE_URL + 'images/' + data.image;
      }

      this.cart = data_cart.data.length;
      this.data = datas.data;

      loading.dismiss();

    } catch (error: any) {
      loading.dismiss();
      this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }
}
