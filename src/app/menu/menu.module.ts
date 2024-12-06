import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { GenreModule } from '../genre/genre.module';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, AppRoutingModule, RouterModule, GenreModule],
})
export class MenuModule {}
