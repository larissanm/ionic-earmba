import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';

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
import { QuestionsPage } from '../pages/questions/questions';
import { AddQuestionsPage } from '../pages/add-questions/add-questions';
import { ProfilePage } from '../pages/profile/profile';

import { AddActivityComponent } from '../components/add-activity/add-activity';
import { EditActivityComponent } from '../components/edit-activity/edit-activity';
import { AddMedicineComponent } from '../components/add-medicine/add-medicine';
import { TestMinimentalComponent } from '../components/test-minimental/test-minimental';
import { TestPersonalComponent } from '../components/test-personal/test-personal';


import { AuthServiceProvider } from '../providers/auth-service/auth-service';

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
    QuestionsPage,
    AddQuestionsPage,
    ProfilePage,
    AddActivityComponent,
    EditActivityComponent,
    AddMedicineComponent,
    TestMinimentalComponent,
    TestPersonalComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    LoginPage,
    QuestionsPage,
    AddQuestionsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
