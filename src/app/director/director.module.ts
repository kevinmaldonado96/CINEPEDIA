import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorListComponent } from './director-list/director-list.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { DirectorDetailsFilterComponent } from './director-details-filter/director-details-filter.component'
import { DirectorCreateComponent } from './director-create/director-create.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxLoadingModule.forRoot({})],
  declarations: [DirectorListComponent, DirectorDetailComponent, DirectorDetailsFilterComponent, DirectorCreateComponent],
  exports: [DirectorListComponent, DirectorDetailComponent],
})
export class DirectorModule {}
