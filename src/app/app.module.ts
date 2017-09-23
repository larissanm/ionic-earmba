import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { RotinaPage } from '../pages/rotina/rotina';
import { MedicacaoPage } from '../pages/medicacao/medicacao';
import { TestesPage } from '../pages/testes/testes';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { SuportePage } from '../pages/suporte/suporte';
import { InserirAtividadePage } from '../pages/inserir-atividade/inserir-atividade';
import { LoginPage } from '../pages/login/login';
import { AddActivityComponent } from '../components/add-activity/add-activity';
import { AddMedicineComponent } from '../components/add-medicine/add-medicine';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    RotinaPage,
    MedicacaoPage,
    TestesPage,
    RelatoriosPage,
    ConfiguracoesPage,
    SuportePage,
    InserirAtividadePage,
    LoginPage,
    AddActivityComponent,
    AddMedicineComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    RotinaPage,
    MedicacaoPage,
    TestesPage,
    RelatoriosPage,
    ConfiguracoesPage,
    SuportePage,
    InserirAtividadePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
