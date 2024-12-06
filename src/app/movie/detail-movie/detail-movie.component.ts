import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Movie} from "../movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailMovieComponent implements OnInit {
  id: string = '';
  popularity: number[] = [];
  movie: Movie;
  detail: string;
  extras: string;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.movie = new Movie();
    this.detail = $localize`:@@word.detail.single.pascal-case:Detalle`;
    this.extras = $localize`:@@word.extras.plural.pascal-case:Extras`;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieDetail(this.id);

  }

  initComponents(){
    const containerHtml = document.getElementById('container-detail-movie');
    if ( containerHtml != null ){
      containerHtml.style.backgroundImage = `url(${this.movie.poster})`;
    }
  }

  movieDetail(id: string){
    this.movieService.getMovieById(id).subscribe(
      {
        next: data => {
          this.movie = data;
          this.popularity = this.createRange(this.movie.popularity);
          this.initComponents();
        },
        error: err => {
          Swal.fire({
            title: $localize`:@@word.movie.pascal-case:Película`,
            text: $localize`:@@sweet-alert.error-message-detail:No fue posible obtener el detalle`,
            icon: 'error',
            confirmButtonText: $localize`:@@btn-accept:Aceptar`
          });
          this.backToMovies();
        }
      }
    )
  }

  createRange(number: number): number[] {
    let array = new Array(5).fill(0)
      .map((n, index) => index < number ? 1 : 0);
    return array;
  }

  backToMovies(){
    this.router.navigate(['movies']);
  }
}
