import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';
import Swal from 'sweetalert2';
import { GenreList } from '../genreList';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css'],
})
export class GenreCreateComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  genreForm!: FormGroup;
  loading = false;
  genres: Array<GenreList> = [];

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService
  ) {}

  ngOnInit() {
    this.getGenres();
    this.genreForm = this.formBuilder.group({
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  createGenre(genre: Genre) {
    this.loading = true;
    this.genreService.postGenre(genre).subscribe({
      next: () => {
        this.showSuccess();
        this.getGenres();
        this.genreForm.reset();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  showSuccess() {
    Swal.fire({
      icon: 'success',
      title: $localize`:@@dialog.genre.create.success:El genero se ha creado con exito`,
      confirmButtonText: 'Ok',
    });
  }
  closeModal() {
    this.closeBtn.nativeElement.click();
    this.genreForm.reset();
  }
  getGenres() {
    this.loading = true;
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
