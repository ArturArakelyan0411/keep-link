import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Environment
import { environment } from '../environments/environment';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './core/components/user-layout/user-layout.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';

// Store
import { appReducer } from './store/app.reducer';
import { metaReducers } from './store/meta.reducers';
import { appEffects } from './store/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,

    // Router
    AppRoutingModule,

    // NgRx
    StoreModule.forRoot(appReducer, { metaReducers }),
    EffectsModule.forRoot(appEffects),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    // Toastr
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),

    // Service Worker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.prod,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
