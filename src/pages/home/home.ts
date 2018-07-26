import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from '../../services/api.service';
import { Facebook } from '@ionic-native/facebook';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  searchForm: FormGroup;
  loading: any;
  user: any = {};
  showUser: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    public navCtrl: NavController,
    private apiService: ApiProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private facebook: Facebook,
    public toastCtrl: ToastController
  ) {
    this.facebook.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
    this.searchForm = this.formBuilder.group({
      idOrName: ['', Validators.required]
    });

  }
  get f() { return this.searchForm.controls; }
  resetForm() {
    this.searchForm.controls.idOrName.setValue("");
  }
  buscarPokemones() {

    if (this.searchForm.invalid) {
      return;
    }
    this.loading = this.loadingCtrl.create({
      content: "Buscando pokemones..",
      dismissOnPageChange: true
    });
    this.loading.present();


    this.apiService.getPokemons(this.f.idOrName.value.toLowerCase()).subscribe((data) => {
      this.loading.dismiss();
      this.resetForm();
      this.navCtrl.push(DetailPage, {
        item: data
      });
    }, err => {
      this.loading.dismiss();

      let toast = this.toastCtrl.create({
        message: `Error: ${err.status}, ${err.error.detail}`,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.resetForm();
    });

  }
  //fb

  loginFacebook() {
    this.facebook.login(['public_profile', 'email'])
      .then(rta => {
        console.log(rta.status);
        if (rta.status == 'connected') {
          this.getInfo();
        };
      })
      .catch(error => {
        console.error(error);
      });
  }
  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        console.log(data);
        this.showUser = true;
        this.user = data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
