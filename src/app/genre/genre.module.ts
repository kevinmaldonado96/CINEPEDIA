import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreCreateComponent } from './genre-create/genre-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxLoadingModule.forRoot({})],
  declarations: [GenreCreateComponent],
  exports: [GenreCreateComponent],
})
export class GenreModule {}
