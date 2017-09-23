import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RotinaPage } from '../pages/rotina/rotina';
import { MedicacaoPage } from '../pages/medicacao/medicacao';
import { TestesPage } from '../pages/testes/testes';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { SuportePage } from '../pages/suporte/suporte';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('NAV') nav: Nav;

  profilePicture: any = "assets/icon/profile.png"

  public rootPage: any;

  public pages: Array<{titulo: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.rootPage = LoginPage;
    
    this.pages = [
      {titulo: 'Home',          component: HomePage,          icon: 'home'},
      {titulo: 'Rotina',        component: RotinaPage,        icon: 'list-box'},
      {titulo: 'Medicação',     component: MedicacaoPage,     icon: 'medkit'},
      {titulo: 'Testes',        component: TestesPage,        icon: 'clipboard'},
      {titulo: 'Relatórios',    component: RelatoriosPage,    icon: 'stats'},
      {titulo: 'Configurações', component: ConfiguracoesPage, icon: 'settings'},
      {titulo: 'Suporte',       component: SuportePage,       icon: 'headset'}
    ];

    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToPage(page){
    this.nav.setRoot(page);
  }
}

