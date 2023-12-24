import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppJwtModule } from './modules/jwt/app-jwt.module';
import '@angular/common/locales/global/ru';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppJwtModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
