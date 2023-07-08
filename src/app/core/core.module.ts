import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SideMenuResponsiveComponent } from './components/side-menu-responsive/side-menu-responsive.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { AddLinkComponent } from './components/add-link/add-link.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    SideMenuComponent,
    SideMenuResponsiveComponent,
    UserLayoutComponent,
    AddLinkComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    HeaderMenuComponent,
    SideMenuComponent,
    SideMenuResponsiveComponent,
    UserLayoutComponent,
  ],
})
export class CoreModule {

}
