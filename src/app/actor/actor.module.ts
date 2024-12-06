import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar-actores/listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActorDetailFilterComponent } from './actor-detail-filter/actor-detail-filter.component';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ListarComponent, ActorDetailComponent, ActorDetailFilterComponent, CreateActorComponent],
  exports: [ListarComponent, ActorDetailComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [NgbActiveModal]
})
export class ActorModule { }
