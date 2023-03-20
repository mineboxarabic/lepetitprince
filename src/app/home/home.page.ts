import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { NavController  } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public articles: any;
  public className: any;
  constructor( private http: HttpClient , private navCtrl: NavController) {
    this.className = 'les petites';

    this.getData();

  }
  async getData(){
    let email = await Preferences.get({key: 'ConnectedEmail'});
    let password = await Preferences.get({key: 'ConnectedPassword'});
    switch(email.value){
      case 'classe1':
        this.className = 'petites';
        break;
      case 'classe2':
        this.className = 'moyennes';
        break;
      case 'classe3':
        this.className = 'grandes';
        break;

    }
    this.http.get(`http://www.sebastien-thon.fr/prince/index.php?login=${email.value}&mdp=${password.value}`).subscribe((data) => {
      this.articles = data;
      console.log(this.articles.articles);
    });
  }

  showDetails(id: any){
    //navigate to details page
    this.navCtrl.navigateRoot(`/details`, {queryParams: {id: id-1}});
  }

}
