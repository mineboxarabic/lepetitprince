import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private id: any;
  public theOpenedArticle: any;
  public articles: any;
  public Title: any;
  public Content: any;
  public Images : any;
  public date : any;
  constructor(private route: ActivatedRoute , private http: HttpClient ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getData();

   }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

  async getData(){
    let email = await Preferences.get({key: 'ConnectedEmail'});
    let password = await Preferences.get({key: 'ConnectedPassword'});

    this.http.get(`http://www.sebastien-thon.fr/prince/index.php?login=${email.value}&mdp=${password.value}`).subscribe((data) => {
      this.articles = data;
      this.theOpenedArticle = this.articles.articles[this.id];
      console.log(this.theOpenedArticle);
      this.Title = this.theOpenedArticle.titre;
      this.Content = this.theOpenedArticle.texte;
      this.Images = this.theOpenedArticle.photos;
      this.date = new Date(this.theOpenedArticle.date).toLocaleDateString();

      
    });
  }
  async handleRefresh() {
    this.getData();
  }
}

