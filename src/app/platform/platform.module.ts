import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlatformComponent } from './list-platform/list-platform.component';
import { CreatePlatformComponent } from './create-platform/create-platform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ListPlatformComponent, CreatePlatformComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class PlatformModule { }
