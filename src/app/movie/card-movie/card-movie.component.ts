import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../movie";
import {MovieService} from "../movie.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {
  @Input() movie: Movie;
  @Output("parentOpenPlatformModal") parentOpenPlatformModal: EventEmitter<any> = new EventEmitter<any>();
  @Output("parentOpenActorModal") parentOpenActorModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
    this.movie = new Movie()
  }

  ngOnInit(): void {}

  createRange(number: number): number[] {
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  showDetail(id: string) {
    this.router.navigate(['movie/' + id]);
  }

  openPlatformModal(movie: Movie) {
    this.parentOpenPlatformModal.emit(movie);
  }

  openActorModal(movie: Movie) {
    this.parentOpenActorModal.emit(movie);
  }

}
