import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [CommonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
