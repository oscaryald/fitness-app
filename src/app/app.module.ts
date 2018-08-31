import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Store } from './store';

// components
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

// feauture modules
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/schedule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule,
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
