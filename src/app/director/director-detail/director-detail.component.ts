import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DirectorService } from '../director.service';
import { DirectorDetails } from '../director-details';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css'],
})
export class DirectorDetailComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  public loading: boolean = false;
  public director: DirectorDetails | undefined;
  public routeDirectorId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private directorService: DirectorService
  ) {}

  ngOnInit() {
    this.routeDirectorId = this.route.snapshot.paramMap.get('directorId');
    this.getDirector(this.routeDirectorId);
  }
  getDirectorFromFilters(directorId: string) {
    this.closeBtn.nativeElement.click();
    this.location.go(`director/${directorId}`);
    this.getDirector(directorId);
  }
  getDirector(directorId: string | null) {
    this.loading = true;
    this.directorService.getDirectorDetail(directorId).subscribe({
      next: (directorDetails) => {
        this.director = directorDetails;
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
}
