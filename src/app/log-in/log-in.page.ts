import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public email: string;
  public password: string;
  private ismailExist: boolean;

  constructor() {
    this.email = '';
    this.password = '';
    this.ismailExist = false;

  }

  ngOnInit() {
  }

  setEmail = async () => {
    await Preferences.set({ key: 'email', value: this.email });
  };

  setPassword = async () => {
    await Preferences.set({ key: 'password', value: this.password });
  }



  getEmail = async () => {
    const { value } = await Preferences.get({ key: 'email' });
    if(value) {
      this.email = value;
    }
  }

  getPassword = async () => {
    const { value } = await Preferences.get({ key: 'password' });
    if(value) {
      this.password = value;
    }
  }


  async isMailExistx (){
    let value = await Preferences.get({ key: 'email' });
    if(value) {
      this.ismailExist = true;
    }else {
      this.ismailExist = false;
    }
  }
  logIn() {



    if(this.ismailExist === false) {
      alert('Please register first');
      return;
    }else {
      this.getEmail();
      this.getPassword();

      if(this.email === '' || this.password === '')
    {
      alert('Please enter your email and password');
    }
    else
    {
      alert('You are logged in');
    }
    }





  }






}
