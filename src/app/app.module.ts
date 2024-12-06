import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ActorModule } from './actor/actor.module';
import { DirectorModule } from './director/director.module';
import { AppComponent } from './app.component';
import { MovieModule } from './movie/movie.module';
import { MenuModule } from './menu/menu.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './interceptors/HttpErrorInterceptorService.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlatformModule } from './platform/platform.module';
import { GenreModule } from './genre/genre.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ActorModule,
    AppRoutingModule,
    ActorModule,
    DirectorModule,
    GenreModule,
    PlatformModule,
    MovieModule,
    MenuModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
