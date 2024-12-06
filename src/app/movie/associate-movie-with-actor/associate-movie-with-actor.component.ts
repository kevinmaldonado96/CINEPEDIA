import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Movie} from "../movie";
import Swal from "sweetalert2";
import {ActorService} from "../../actor/actor.service";
import {Actor} from "../../actor/actor";
import {MovieActor} from "../MovieActor";

@Component({
  selector: 'app-associate-movie-with-actor',
  templateUrl: './associate-movie-with-actor.component.html',
  styleUrls: ['./associate-movie-with-actor.component.css']
})
export class AssociateMovieWithActorComponent implements OnInit {
  search: string = '';
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  placeholderFilterActor: string;
  movie: Movie;
  allActor: Array<Actor> = [];
  filteredActor: Array<Actor> = [];
  idActorSelected: string = '';
  titleMessage = $localize`:@@sweet-alert.associate-actor.title:Asociar actor a película`;
  @Output("associatedIds") associatedIds: EventEmitter<MovieActor> = new EventEmitter<MovieActor>();
  constructor(private actorService: ActorService) {
    this.movie = new Movie();
    this.placeholderFilterActor = $localize`:@@verb.search:Buscar` + ' ' + $localize`:@@subject-actor-single:actor`;
  }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    let actors = this.actorService.getActors();
    actors.subscribe(
      {
        next: data => {
          this.allActor = this.sortActorsByName(data);
          this.filteredActor = this.allActor;
        },
        error: () => {
          Swal.fire({
            title: this.titleMessage,
            text: $localize`:@@sweet-alert.error-message:No es posible obtener el listado de` + ' ' + $localize`:@@subject-actor-plural:actors`,
            icon: 'error',
            confirmButtonText: $localize`:@@btn-accept:Aceptar`
          });
        }
      }
    )
  }

  searchActor(name: string) {
    this.filteredActor = this.allActor.filter(actor => {
      return actor.name.toLowerCase().includes(name.toLowerCase())
    });
  }

  sortActorsByName(actors: Array<Actor>) {
    return actors.sort((m1, m2) => (m1.name > m2.name ? 1 : -1));
  }
  openActorModal(movie: Movie){
    this.movie = movie;
    this.filteredActor = this.discardActors(this.allActor, movie);
    if (this.filteredActor.length == 0) {
      this.closeActorModal();
      Swal.fire({
        title: this.titleMessage,
        text: $localize`:@@subject-actor-plural:actors` + ' ' + $localize`:@@sweet-alert-all-items-assigned:han sido asignados en su totalidad a la película`,
        icon: 'warning',
        confirmButtonText: $localize`:@@btn-accept:Aceptar`
      });
    }
    this.idActorSelected = '';
  }

  closeActorModal(){
    this.closeBtn.nativeElement.click();
  }

  getIdActorSelected(event: any){
    this.idActorSelected = event.target.value;
  }

  associateActor(idActorSelected: string, idMovie: string) {
    if (this.availableActors(this.filteredActor, idActorSelected)){
      this.actorService.associateMovie(idActorSelected, idMovie).subscribe(
        {
          next: value => {
            this.closeActorModal();
            this.associatedIds.emit(
              MovieActor.fromAllAttributesInstance(
                idMovie,
                this.findActorById(this.filteredActor, idActorSelected)
              )
            )
            Swal.fire({
              title: this.titleMessage,
              text: $localize`:@@subject-actor-single:actor` + value.name + ' ' + 'se ha asociado a la película' + ' ' + this.movie.title,
              icon: 'success',
              confirmButtonText: $localize`:@@btn-accept:Aceptar`
            });
          },
          error: err => {
            Swal.fire({
              title: this.titleMessage,
              text: $localize`:@@sweet-alert-assign-actor-error:No fué posible asignar actor a la película`,
              icon: 'error',
              confirmButtonText: $localize`:@@btn-accept:Aceptar`
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: this.titleMessage,
        text: $localize`:@@sweet-alert.not-selected-item:Por favor seleccione un elemento de la lista`,
        icon: 'warning',
        confirmButtonText: $localize`:@@btn-accept:Aceptar`
      });
    }
  }

  discardActors(actors: Array<Actor>, movie: Movie): Array<Actor> {
    let idMovieActors = movie.actors.map(x => x.id);
    return actors.filter(actor =>  !idMovieActors.includes(actor.id));
  }

  availableActors(actors: Array<Actor>, idActorSelected: string): Boolean {
    return actors.map(p => p.id).includes(idActorSelected);
  }

  findActorById(actors:Array<Actor>, idActor: string): Actor {
    return actors.find(x => x.id == idActor)!!;
  }

}
