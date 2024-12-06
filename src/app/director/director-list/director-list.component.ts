import { Component, OnInit } from '@angular/core';
import { Director } from '../director';
import { DirectorService } from '../director.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.css'],
})
export class DirectorListComponent implements OnInit {
  private readonly ARROW_CLASS_ASCENDING = 'fas fa-arrow-up';
  private readonly ARROW_CLASS_DESCENDING = 'fas fa-arrow-down';

  public loading: boolean = false;
  public animationTypes = ngxLoadingAnimationTypes;
  public itemsPerPage: number = 8;
  public currentPage: number = 1;
  public totalPages = 1;
  public numPageButtons = 5;

  directors: Array<Director> = [];
  directorsFiltered: Array<Director> = [];
  directorsInPage: Array<Director> = [];
  directorSearchName: string = '';
  nameSort: boolean | null = null;
  countrySort: boolean | null = null;

  constructor(
    private directorService: DirectorService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getDirectorsList();
  }
  showDetail(id: string) {
    this.router.navigate(['director/' + id]);
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
      },
    });
  }
  getIcon(rowDown: boolean | null) {
    if (rowDown == null) return '';
    return rowDown ? this.ARROW_CLASS_DESCENDING : this.ARROW_CLASS_ASCENDING;
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
