import { environment } from './../../environments/environment.prod';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import { OrderdetailModalComponent } from '../user/orderdetail-modal/orderdetail-modal.component';
import { ProductDetailModalComponent } from '../user/product-detail-modal/product-detail-modal.component';
import { EditProductModalComponent } from '../admin/edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from '../admin/add-product-modal/add-product-modal.component';
import { EditUserModalComponent } from '../admin/edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from '../admin/add-user-modal/add-user-modal.component';

register();
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public isLoaded = false;
  public folder!: string;
  public data: any;
  public cart: any;
  public isAdministrator = false;
  public onLoad: any;

  private activatedRoute = inject(ActivatedRoute);

  // import loading controller
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const check = await this.checkToken();
    if (!check) return;
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.onLoad = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });

    await this.onLoad.present();

    // check if user is administrator
    const me = await this.getMe();
    if (me.role === 'admin')
      this.isAdministrator = true;
    else
      this.getCartLength();

    switch (this.folder.toLowerCase()) {
      case 'home':
        this.getAllProducts();
        break;

      case 'orders':
        this.getOrders();
        break;

      case 'products':
        this.getAllProductsAdmin();
        break;

      case 'users':
        this.getAllUsers();
        break;

      case 'ordersmanagement':
        this.getAllOrders();
        break;
      default:
        this.onLoad.dismiss();
    }

    this.isLoaded = true;
  }

  async checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true
  }

  async getCartLength() {
    const res_cart = await fetch(environment.BASE_URL + 'api/get-cart', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await res_cart.json();
    this.cart = data.data.length;
  }

  async getAllProducts() {
    try {
      const res = await fetch(environment.BASE_URL + 'api/products/discovery', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const json = await res.json();
      this.data = json.data;

      this.onLoad.dismiss();
    } catch (error: any) {
      this.onLoad.dismiss();
      this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }

  async addToCart(item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(environment.BASE_URL + 'api/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            product_id: item.id,
            quantity: 1
          })
        });

        const data = await res.json();
        if (data.statusCode === 200) {
          this.toastController.create({
            message: 'Berhasil menambahkan ke keranjang',
            duration: 2000,
          }).then(toast => {
            toast.present();
          });

          this.getCartLength();
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

  async getOrders() {
    try {
      const res = await fetch(environment.BASE_URL + 'api/orders', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        this.data = data.data;

        for (const item of this.data) {
          // check status
          item.indicator = 'warning';
          switch (item.status) {
            case 'pending':
              item.indicator = 'warning';
              break;

            case 'processing':
              item.indicator = 'primary';
              break;

            case 'completed':
              item.indicator = 'success';
              break;

            case 'declined':
              item.indicator = 'danger';
              break;

            case 'on delivery':
              item.indicator = 'tertiary';
              break;

            case 'arrived':
              item.indicator = 'success';
              break;

            default:
              item.indicator = 'warning';
              break;
          }

          item.total = parseInt(item.total);

          for (const p of item.order_products) {
            p.product.image = environment.BASE_URL + 'images/' + p.product.image;
          }
        }
      }
      await this.onLoad.dismiss();
    } catch (err: any) {
      this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }

  confirmOrder(item: any) {
    this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin mengkonfirmasi pesanan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Ya',
          handler: async () => {
            this.loadingController.create({
              message: 'Loading...',
              spinner: 'crescent'
            }).then(loading => {
              loading.present();
            });

            try {
              const res = await fetch(environment.BASE_URL + 'api/complete-order/' + item.id, {
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.toastController.create({
                  'message': 'Berhasil mengkonfirmasi pesanan!',
                  'duration': 2000
                }).then(toast => {
                  toast.present();
                  this.loadingController.dismiss();
                });
              }
            } catch (err: any) {
              this.alertController.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              }).then(alert => {
                alert.present();
                this.loadingController.dismiss();
              });
            }

            this.getOrders();
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  async orderDetail(item: any) {
    const modal = await this.modalController.create({
      component: OrderdetailModalComponent,
      componentProps: {
        'item': item
      }
    });

    return await modal.present();
  }

  async productDetail(item: any) {
    const modal = await this.modalController.create({
      component: ProductDetailModalComponent,
      componentProps: {
        'item': item
      }
    });

    return await modal.present();
  }

  async getMe() {
    if (!localStorage.getItem('token')) return this.onLoad.dismiss();
    try {
      const res = await fetch(environment.BASE_URL + 'api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const data = await res.json();

      return data.data;
    } catch (err: any) {
      this.onLoad.dismiss();
      this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    }
  }

  async getAllProductsAdmin() {
    const res = await fetch(environment.BASE_URL + 'api/admin/products', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const json = await res.json();
    this.data = json.data;

    this.onLoad.dismiss();
  }

  async editProductModal(item: any) {
    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      componentProps: {
        'item': item
      }
    });

    modal.onDidDismiss().then(() => {
      this.getAllProductsAdmin();
    });

    return await modal.present();
  }

  async deleteProduct(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete Product',
      message: 'Apakah kamu yakin ingin menghapus produk ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              const res = await fetch(environment.BASE_URL + 'api/admin/products/' + item.id, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Sukses menghapus produk!',
                  buttons: ['OK']
                }).then(alert => {
                  alert.present();
                });

                this.getAllProductsAdmin();
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
          }
        }
      ]
    });
    await alert.present();
  }

  async addProductModal() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent
    });

    modal.onDidDismiss().then(() => {
      this.getAllProductsAdmin();
    });

    return await modal.present();
  }

  ngOnDestroy() {
    this.onLoad.dismiss();
  }

  async getAllUsers() {
    const res = await fetch(environment.BASE_URL + 'api/admin/users', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const json = await res.json();
    this.data = json.data;

    this.onLoad.dismiss();
  }

  async editUserModal(item: any) {
    const modal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: {
        'item': item
      }
    });

    modal.onDidDismiss().then(() => {
      this.getAllUsers();
    });

    return await modal.present();
  }

  async addUserModal() {
    const modal = await this.modalController.create({
      component: AddUserModalComponent
    });

    modal.onDidDismiss().then(() => {
      this.getAllUsers();
    });

    return await modal.present();
  }

  async deleteUser(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete User',
      message: 'Apakah kamu yakin ingin menghapus user ini?',
      buttons: [
        {
          'text': 'Cancel',
          'role': 'cancel'
        },
        {
          'text': 'Delete',
          handler: async () => {
            this.loadingController.create({
              message: 'Please wait...'
            }).then(onLoad => {
              onLoad.present();
            });

            try {
              const res = await fetch(environment.BASE_URL + 'api/admin/users/' + item.id, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Sukses menghapus user!',
                  buttons: ['OK']
                }).then(alert => {
                  this.loadingController.dismiss();
                  alert.present();
                });

                this.getAllUsers();
              }
            } catch (err: any) {
              this.alertController.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              }).then(alert => {
                alert.present();
                this.loadingController.dismiss();
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async getAllOrders() {
    const res = await fetch(environment.BASE_URL + 'api/admin/orders', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const json = await res.json();
    this.data = json.data;

    for (const item of this.data) {
      item.indicator = 'warning';
      console.log(item.status);
      switch (item.status) {
        case 'pending':
          item.indicator = 'warning';
          break;

        case 'processing':
          item.indicator = 'primary';
          break;

        case 'completed':
          item.indicator = 'success';
          break;

        case 'declined':
          item.indicator = 'danger';
          break;

        case 'on delivery':
          item.indicator = 'tertiary';
          break;

        case 'arrived':
          item.indicator = 'secondary';
          break;

        default:
          item.indicator = 'warning';
          break;
      }
    }

    this.onLoad.dismiss();
  }

  async acceptOrder(item: any) {
    this.alertController.create({
      header: 'Accept Order',
      message: 'Apakah kamu yakin ingin menerima pesanan ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Accept',
          handler: async () => {
            try {
              this.loadingController.create({
                message: 'Please wait...'
              }).then(onLoad => {
                onLoad.present();
              });

              const res = await fetch(environment.BASE_URL + 'api/admin/accept-order/' + item.id, {
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Sukses menerima pesanan!',
                  buttons: ['OK']
                }).then(alert => {
                  alert.present();
                  this.loadingController.dismiss();
                });

                this.getAllOrders();
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
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  async declineOrder(item: any) {
    this.alertController.create({
      header: 'Tolak Pesanan',
      message: 'Apakah kamu yakin ingin menolak pesanan ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Tolak',
          handler: async () => {
            this.loadingController.create({
              message: 'Please wait...'
            }).then(onLoad => {
              onLoad.present();
            });

            try {
              const res = await fetch(environment.BASE_URL + 'api/admin/decline-order/' + item.id, {
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Sukses menolak pesanan!',
                  buttons: ['OK']
                }).then(alert => {
                  alert.present();
                  this.loadingController.dismiss();
                });
              }

              this.getAllOrders();
            } catch (err: any) {
              this.alertController.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              }).then(alert => {
                alert.present();
                this.loadingController.dismiss();
              });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  sendOrder(item: any) {
    this.alertController.create({
      header: 'Kirim Pesanan',
      message: 'Apakah kamu yakin ingin mengirim pesanan ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Kirim',
          handler: async () => {
            this.loadingController.create({
              message: 'Please wait...'
            }).then(onLoad => {
              onLoad.present();
            });

            try {
              const res = await fetch(environment.BASE_URL + 'api/admin/deliver-order/' + item.id, {
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Sukses mengirim pesanan!',
                  buttons: ['OK']
                }).then(alert => {
                  alert.present();
                });
              }

              this.getAllOrders();
              this.loadingController.dismiss();
            } catch (err: any) {
              this.alertController.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              }).then(alert => {
                alert.present();
                this.loadingController.dismiss();
              });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  arrivedOrder(item: any) {
    this.alertController.create({
      header: 'Pesanan Tiba',
      message: 'Apakah kamu yakin ingin menandai pesanan ini telah tiba?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Tiba',
          handler: async () => {
            this.loadingController.create({
              message: 'Please wait...'
            }).then(onLoad => {
              onLoad.present();
            });

            try {
              const res = await fetch(environment.BASE_URL + 'api/admin/arrive-order/' + item.id, {
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });

              const json = await res.json();
              if (json.statusCode === 200) {
                this.alertController.create({
                  header: 'Success',
                  message: 'Pesanan telah tiba!',
                  buttons: ['OK']
                }).then(alert => {
                  alert.present();
                });
              }

              this.getAllOrders();
              this.loadingController.dismiss();
            } catch (err: any) {
              this.alertController.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              }).then(alert => {
                alert.present();
                this.loadingController.dismiss();
              });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }
}
