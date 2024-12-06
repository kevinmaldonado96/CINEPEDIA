import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from '../actor';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-detail-filter',
  templateUrl: './actor-detail-filter.component.html',
  styleUrls: ['./actor-detail-filter.component.css']
})
export class ActorDetailFilterComponent implements OnInit {

  private readonly ARROW_CLASS_ASCENDING = 'fas fa-arrow-up';
  private readonly ARROW_CLASS_DESCENDING = 'fas fa-arrow-down';
  placeholderBuscarActor: string;

  @Output() selectedActor = new EventEmitter<string>();
  @Input() actorId: string | null = '';

  currentPage: number;
  actorsPerPage: number;
  totalActors: number;
  numPageButtons: number;
  actors: Array<Actor> = [];
  sortName: boolean | null = null;
  sortCountry: boolean | null = null;

  ngOnInit(): void {
  }


  constructor(private actorService: ActorService) {
    this.getActors();
    this.currentPage = 1;
    this.actorsPerPage = 8;
    this.numPageButtons = 3;
    this.totalActors = 0;
    this.placeholderBuscarActor = $localize`:@@placeholder.buscar.actor:Buscar Actor`;


  }

  getCurrentPageActors() {
    const startIndex = (this.currentPage - 1) * this.actorsPerPage;
    const endIndex = startIndex + this.actorsPerPage;
    return this.actors.slice(startIndex, endIndex);
  }

  getPageNumbers() {
    const numPages = Math.ceil(this.totalActors / this.actorsPerPage);
    const pageNumbers = [];

    let startPage = this.currentPage - Math.floor(this.numPageButtons / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + this.numPageButtons - 1, numPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }


  getActors(): void{
    this.actorService.getActors().subscribe(
      {next:  (actors) => {
        this.actors = actors;
        this.totalActors = this.actors.length;
      }});

    }

    getActorsByName(name: string): void {
      if(name){
        this.actors = this.actors.filter(actor => actor.name.toLowerCase().includes(name.toLowerCase()));
        this.totalActors = this.actors.length;
      }else{
        this.getActors();
      }
    }

    sortByName() {
      this.sortName = !this.sortName;
      this.sortCountry = null;

      const sortedActors = [...this.actors].sort((a,b) => a.name.localeCompare(b.name));
      if(this.sortName){
        this.actors = [...sortedActors].reverse();
      }else{
        this.actors = sortedActors;
      }
    }

    sortByContry() {
      this.sortCountry = !this.sortCountry;
      this.sortName = null;

      const sortedActors = [...this.actors].sort((a,b) => a.nationality.localeCompare(b.nationality));
      if(this.sortCountry){
        this.actors = [...sortedActors].reverse();
      }else{
        this.actors = sortedActors;
      }

    }

    getIcon(rowDown: boolean | null) {
      if (rowDown == null) return '';
      return rowDown ? this.ARROW_CLASS_DESCENDING : this.ARROW_CLASS_ASCENDING;
    }

    selectActor(id: string) {
      this.actorId = id;
      this.selectedActor.emit(id);
    }
}
