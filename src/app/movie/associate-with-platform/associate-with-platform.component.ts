import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Movie} from "../movie";
import {PlatformService} from "../../platform/platform.service";
import Swal from "sweetalert2";
import {Platform} from "../../platform/platform";
import {MoviePlatform} from "../Movie-platform";

@Component({
  selector: 'app-associate-platform-movie',
  templateUrl: './associate-with-platform.component.html',
  styleUrls: ['./associate-with-movie.component.css']
})
export class AssociateWithPlatformComponent implements OnInit {

  search: string = '';
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  movie: Movie;
  allPlatform: Array<Platform> = [];
  filteredPlatform: Array<Platform> = [];
  idPlatformSelected: string = '';
  titleMessage = $localize`:@@sweet-alert.associate-platform.title:Asociar plataforma a película`;
  placeholderPlatformFilter: string;
  @Output("associatedIds") associatedIds: EventEmitter<MoviePlatform> = new EventEmitter<MoviePlatform>();
  constructor(private platformService: PlatformService) {
    this.movie = new Movie();
    this.placeholderPlatformFilter = $localize`:@@verb.search:Buscar` + ' ' + $localize`:@@subject-platform-single:plataforma`;
  }

  ngOnInit(): void {
    this.getPlatforms();
  }

  getPlatforms(): void {
    let movies = this.platformService.findAll();
    movies.subscribe(
      {
        next: data => {
          this.allPlatform = this.sortPlatformsByName(data);
          this.filteredPlatform = this.allPlatform;
        },
        error: () => {
          Swal.fire({
            title: this.titleMessage,
            text: $localize`:@@sweet-alert.error-message:No es posible obtener el listado de` + ' ' + $localize`:@@subject-platform-plural:plataformas`,
            icon: 'error',
            confirmButtonText: $localize`:@@btn-accept:Aceptar`
          });
        }
      }
    )
  }

  searchPlatform(name: string) {
    this.filteredPlatform = this.allPlatform.filter(platform => {
      return platform.name.toLowerCase().includes(name.toLowerCase())
    });
  }

  sortPlatformsByName(platforms: Array<Platform>) {
    return platforms.sort((m1, m2) => (m1.name > m2.name ? 1 : -1));
  }
  openPlatformModal(movie: Movie){
    this.movie = movie;
    this.filteredPlatform = this.discardPlatforms(this.allPlatform, movie);
    if (this.filteredPlatform.length == 0) {
      this.closePlatformModal();
      Swal.fire({
        title: this.titleMessage,
        text: $localize`:@@subject-platform-plural:plataformas` + ' ' + $localize`:@@sweet-alert-all-items-assigned:han sido asignados en su totalidad a la película`,
        icon: 'warning',
        confirmButtonText: $localize`:@@btn-accept:Aceptar`
      });
    }
    this.idPlatformSelected = '';
  }

  closePlatformModal(){
    this.closeBtn.nativeElement.click();
  }

  getIdPlatformSelected(event: any){
    this.idPlatformSelected = event.target.value;
  }

  associatePlatform(idPlatformSelected: string, idMovie: string) {
    if (this.availablePlatforms(this.filteredPlatform, idPlatformSelected)){
      this.platformService.associateMovie(idPlatformSelected, idMovie).subscribe(
        {
          next: value => {
            this.closePlatformModal();
            this.associatedIds.emit(
              MoviePlatform.fromAllAttributesInstance(
                idMovie,
                this.findPlatformById(this.filteredPlatform, idPlatformSelected)
              )
            )
            Swal.fire({
              title: this.titleMessage,
              text: $localize`:@@subject-platform-single:plataforma` + value.name + ' ' + 'se ha asociado a la película' + ' ' + this.movie.title,
              icon: 'success',
              confirmButtonText: $localize`:@@btn-accept:Aceptar`
            });
          },
          error: err => {
            Swal.fire({
              title: this.titleMessage,
              text: $localize`:@@sweet-alert-assign-platform-error:No fué posible asignar plataforma a la película`,
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

  discardPlatforms(platforms: Array<Platform>, movie: Movie): Array<Platform> {
    let idMoviePlatforms = movie.platforms.map(x => x.id);
    return platforms.filter(platform =>  !idMoviePlatforms.includes(platform.id));
  }

  availablePlatforms(platforms: Array<Platform>, idPlatformSelected: string): Boolean {
    return platforms.map(p => p.id).includes(idPlatformSelected);
  }

  findPlatformById(platforms:Array<Platform>, idPlatform: string): Platform {
    return platforms.find(x => x.id == idPlatform)!!;
  }
}
