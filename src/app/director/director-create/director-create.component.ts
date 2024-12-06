import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectorCreate } from '../directorCreate';
import { DirectorService } from '../director.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
  styleUrls: ['./director-create.component.css'],
})
export class DirectorCreateComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output() reloadDirectors = new EventEmitter();
  directorForm!: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private directorService: DirectorService
  ) {}
  ngOnInit() {
    this.directorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      photo: ['', [Validators.required, Validators.pattern('^https?://(?:[a-z-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|jpeg|gif|png)')]],
      nationality: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      birthDate: ['', Validators.required],
      biography: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(255)]],
    });
  }
  createDirector(director: DirectorCreate) {
    this.loading = true;
    this.directorService.postDirector(director).subscribe({
      next: () => {
        this.showSuccess();
        this.directorForm.reset();
        this.loading = false;
        this.reloadDirectors.emit();
        this.closeBtn.nativeElement.click();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  showSuccess() {
    Swal.fire({
      icon: 'success',
      title: $localize`:@@dialog.director.create.success:El director se ha creado con exito`,
      confirmButtonText: 'Ok',
    });
  }
  closeModal() {
    this.closeBtn.nativeElement.click();
    this.directorForm.reset();
  }
}
