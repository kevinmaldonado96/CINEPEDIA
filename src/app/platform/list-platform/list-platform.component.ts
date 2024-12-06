import { Component, OnInit } from '@angular/core';
import { Platform } from '../platform';
import { PlatformService } from '../platform.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePlatformComponent } from '../create-platform/create-platform.component';

@Component({
  selector: 'app-list-platform',
  templateUrl: './list-platform.component.html',
  styleUrls: ['./list-platform.component.css']
})
export class ListPlatformComponent implements OnInit {

  private readonly ARROW_CLASS_ASCENDING = 'fas fa-arrow-up';
  private readonly ARROW_CLASS_DESCENDING = 'fas fa-arrow-down';

  platforms: Array<Platform> = [];
  currentPage: number;
  platformPerPage: number;
  totalPlatform: number;
  numPageButtons: number;
  arrowClassName: String;
  placeholderBuscarPlataforma: String;
  isAscendingName: Boolean;


  constructor(private platformService: PlatformService, private modalService: NgbModal) {
    this.arrowClassName = this.ARROW_CLASS_ASCENDING;
    this.currentPage = 1;
    this.platformPerPage = 8;
    this.totalPlatform = 0;
    this.numPageButtons = 5;
    this.isAscendingName = true;
    this.placeholderBuscarPlataforma = $localize`:@@placeholder.buscar.plataforma:Buscar Plataforma`;
   }

  ngOnInit(): void {
    this.getPlatform();
  }

  getPlatform(): void{
    this.platformService.getPlatform().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
        this.totalPlatform = this.platforms.length;
      },
      error: (error) => {
        console.log(error);
        this.showPopUpError();
      }
    });
  }

  openModalCreatePlatform(){
    const modalReference = this.modalService.open(CreatePlatformComponent);
    modalReference.componentInstance.refreshListPlatform.subscribe(() => {
         this.getPlatform();
    });
  }
  getCurrentPagePlatform() {
    const startIndex = (this.currentPage - 1) * this.platformPerPage;
    const endIndex = startIndex + this.platformPerPage;
    return this.platforms.slice(startIndex, endIndex);
  }

  getPageNumbers() {
    const numPages = Math.ceil(this.totalPlatform / this.platformPerPage);
    const pageNumbers = [];

    let startPage = this.currentPage - Math.floor(this.numPageButtons / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + this.numPageButtons - 1, numPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  showPopUpError(): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: $localize`:@@dialog.requets.solicitude.error:Ocurrió un error al procesar la solicitud, por favor contacte al administrador`,
      confirmButtonText: 'Ok'
    });
  }

  orderByName(){
    if(this.isAscendingName){
      this.platforms = this.platforms.sort((a,b) => a.name.localeCompare(b.name));
      this.arrowClassName = this.ARROW_CLASS_ASCENDING;
      this.isAscendingName = false;
    }else{
      this.platforms = this.platforms.sort((a,b) => b.name.localeCompare(a.name));
      this.arrowClassName = this.ARROW_CLASS_DESCENDING;
      this.isAscendingName = true;
    }
  }

  getPlatformByName(name: string): void {
    if(name){
      this.platforms = this.platforms.filter(platform => platform.name.toLowerCase().includes(name.toLowerCase()));
      this.totalPlatform = this.platforms.length;
    }else{
      this.getPlatform();
    }
  }



}
