import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DirectorService } from '../director.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Director } from '../director';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-details-filter',
  templateUrl: './director-details-filter.component.html',
  styleUrls: ['./director-details-filter.component.css'],
})
export class DirectorDetailsFilterComponent implements OnInit {
  private readonly ARROW_CLASS_ASCENDING = 'fas fa-arrow-up';
  private readonly ARROW_CLASS_DESCENDING = 'fas fa-arrow-down';

  @Input() directorId: string | null = '';
  @Output() selectedDirector = new EventEmitter<string>();

  directors: Array<Director> = [];
  directorsFiltered: Array<Director> = [];
  directorsInPage: Array<Director> = [];
  nameSort: boolean | null = null;
  countrySort: boolean | null = null;

  directorSearchName: string = '';
  public loading: boolean = false;
  public animationTypes = ngxLoadingAnimationTypes;
  public itemsPerPage: number = 6;
  public currentPage: number = 1;
  public totalPages = 1;
  public numPageButtons = 5;

  constructor(private directorService: DirectorService) {}

  ngOnInit() {
    this.getDirectorsList();
  }

  selectDirector(id: string) {
    this.directorId = id;
    this.selectedDirector.emit(id);
  }

  getDirectorsList() {
    this.loading = true;
    this.directorService.getDirectors().subscribe({
      next: (directorDetails) => {
        this.directors = directorDetails.map((dir) => {
          const currentDir: Director = new Director(
            dir.id,
            dir.name,
            dir.photo,
            dir.nationality,
            dir.movies.length
          );
          return currentDir;
        });
        this.directorsFiltered = [...this.directors];
        this.getTotalPages();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showPopUpError();
      },
    });
  }
  showPopUpError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Ocurrió un error al procesar la solicitud, por favor contacte al administrador`,
      confirmButtonText: 'Ok',
    });
  }
  sortByName() {
    this.nameSort = !this.nameSort;
    this.countrySort = null;
    this.directorsFiltered = this.sortItems(
      this.directorsFiltered,
      this.nameSort,
      'name'
    );
  }
  getIcon(rowDown: boolean | null) {
    if (rowDown == null) return '';
    return rowDown ? this.ARROW_CLASS_DESCENDING : this.ARROW_CLASS_ASCENDING;
  }
  sortByContry() {
    this.countrySort = !this.countrySort;
    this.nameSort = null;
    this.directorsFiltered = this.sortItems(
      this.directorsFiltered,
      this.countrySort,
      'nationality'
    );
  }
  sortItems(
    directors: any[],
    sortAscending: boolean,
    sortCriteria: string
  ): Director[] {
    directors.sort(function (a, b) {
      if (a[sortCriteria] > b[sortCriteria]) {
        return sortAscending ? 1 : -1;
      }
      if (a[sortCriteria] < b[sortCriteria]) {
        return sortAscending ? -1 : 1;
      }
      return 0;
    });
    return directors;
  }
  search(filterText: string) {
    this.resetSort();
    this.loading = true;
    this.directorsFiltered = this.directors.filter(
      (director) =>
        director.name.toUpperCase().indexOf(filterText.toUpperCase()) != -1
    );
    this.getTotalPages();
    this.loading = false;
  }
  resetSort() {
    this.nameSort = null;
    this.countrySort = null;
  }
  getTotalPages() {
    this.totalPages = Math.ceil(
      this.directorsFiltered.length / this.itemsPerPage
    );
  }
  getPageNumbers() {
    const pageNumbers = [];
    let startPage = this.currentPage - Math.floor(this.numPageButtons / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(
      startPage + this.numPageButtons - 1,
      this.totalPages
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  getCurrentPageElements(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const finalIndex = startIndex + this.itemsPerPage;
    return this.directorsFiltered.slice(startIndex, finalIndex);
  }
}
