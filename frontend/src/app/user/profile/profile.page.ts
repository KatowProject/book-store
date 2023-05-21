import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form: any = {}
  me: any;

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.getMe().then(me => {
      this.me = me;

      this.form.name = this.me.data.name;
      this.form.email = this.me.data.email;
    });
  }

  save() {
    console.log(this.form);
  }
}
