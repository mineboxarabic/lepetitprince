import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public email: string;
  public password: string;
  public rememberMe: boolean;

  constructor(private navCtrl:NavController, private http: HttpClient, private toastController: ToastController){
    this.email = '';
    this.password = '';
    this.rememberMe = false;

    this.checkIfSaved();
  }

  ngOnInit() {
  }
  async checkIfSaved(){
    let email = await Preferences.get({key: 'SavedEmail'});
    let password = await Preferences.get({key: 'SavedPassword'});
    if(email.value != null && password.value != null){
      this.email = email.value;
      this.password = password.value;
      this.rememberMe = true;
    }
    else {
      this.rememberMe = false;
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Mot de pass ou email incorrect',
      duration: 1500,
      position: position
    })
    await toast.present();
  }
  async logIn(){
    this.http.get(`http://www.sebastien-thon.fr/prince/index.php?connexion&login=${this.email}&mdp=${this.password}`).subscribe((data) => {
      let response = JSON.parse(JSON.stringify(data));
      console.log(response['resultat']);
      if(response['resultat'] == 'OK'){
        if(this.rememberMe)
        {
        Preferences.set({key: 'SavedEmail', value: this.email});
        Preferences.set({key: 'SavedPassword', value: this.password});
        }
        Preferences.set({key: 'ConnectedEmail', value: this.email});
        Preferences.set({key: 'ConnectedPassword', value: this.password});
        this.navCtrl.navigateRoot('home');
      }
      else{
        this.presentToast('top');
      }
    });
  }


}
