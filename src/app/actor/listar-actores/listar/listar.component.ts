import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../actor.service';
import { Actor } from '../../actor';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateActorComponent } from '../../create-actor/create-actor.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  private readonly ARROW_CLASS_ASCENDING = 'fas fa-arrow-up';
  private readonly ARROW_CLASS_DESCENDING = 'fas fa-arrow-down';

  actors: Array<Actor> = [];
  isAscendingName: boolean ;
  isAscendingNationality: boolean;
  arrowClassName: string;
  arrowClassNationality: string;
  currentPage: number;
  actorsPerPage: number;
  totalActors: number;
  numPageButtons: number;
  placeholderBuscarActor: string;

  constructor(private actorService:  ActorService, private modalService: NgbModal) {
    this.placeholderBuscarActor = $localize`:@@placeholder.buscar.actor:Buscar Actor`;
    this.arrowClassName = this.ARROW_CLASS_ASCENDING;
    this.arrowClassNationality = this.ARROW_CLASS_ASCENDING;
    this.isAscendingName = true;
    this.isAscendingNationality = true;
    this.currentPage = 1;
    this.actorsPerPage = 8;
    this.numPageButtons = 5;
    this.totalActors = 0;
  }

  ngOnInit(): void {
    this.getActors();

  }

  getActors(): void{
    console.log('getActors');
    this.actorService.getActors().subscribe((actors) => {
      this.actors = actors;
      this.totalActors = this.actors.length;
    },
    (error) => {
      this.showPopUpError();
    });
  }

  openModalCreateActor(){
    const modalReference = this.modalService.open(CreateActorComponent);
    modalReference.componentInstance.refreshListActors.subscribe(() => {
      this.getActors();
    });
  }

  showPopUpError(): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: $localize`:@@dialog.requets.solicitude.error:Ocurrió un error al procesar la solicitud, por favor contacte al administrador`,
      confirmButtonText: 'Ok'
    });
  }

  getActorsByName(name: string): void {
    if(name){
      this.actors = this.actors.filter(actor => actor.name.toLowerCase().includes(name.toLowerCase()));
      this.totalActors = this.actors.length;
    }else{
      this.getActors();
    }
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


  orderByName(){

    const sortedActors = [...this.actors].sort((a,b) => a.name.localeCompare(b.name));

    if(this.isAscendingName){
      this.actors = [...sortedActors].reverse();
      this.arrowClassName = this.ARROW_CLASS_ASCENDING;
      this.isAscendingName = false;
    }else{
      this.actors = sortedActors;
      this.arrowClassName = this.ARROW_CLASS_DESCENDING;
      this.isAscendingName = true;
    }
  }

  orderByNationality(){

    const sortedActors = [...this.actors].sort((a,b) => a.nationality.localeCompare(b.nationality));
    if(this.isAscendingNationality){
      this.actors = [...sortedActors].reverse();
      this.arrowClassNationality = this.ARROW_CLASS_ASCENDING;
      this.isAscendingNationality = false;
    }else{
      this.actors = sortedActors;
      this.arrowClassNationality = this.ARROW_CLASS_DESCENDING;
      this.isAscendingNationality = true;
    }
  }

}
