import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {
  private endpoint!: string;
  private activatedRoute = inject(ActivatedRoute);
  private data: any;

  constructor(private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.endpoint = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getProductDetail();
  }

  async getProductDetail() {
    return new Promise(async (resolve, reject) => {
      try {
        const loading = await this.loadingController.create({
          message: 'Loading...'
        });

        loading.present();

        const res = await fetch(AppComponent.BASE_URL + 'api/products/' + this.endpoint, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        const data = await res.json();

        if (data.statusCode === 200) {
          this.data = data.data;
          loading.dismiss();
          return resolve(true);
        }
      } catch (err: any) {
        this.alertController.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
      }
    });
  }
}
