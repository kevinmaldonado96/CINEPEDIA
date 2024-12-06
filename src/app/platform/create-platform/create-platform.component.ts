import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformService } from '../platform.service';
import { Platform } from '../platform';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-create-platform',
  templateUrl: './create-platform.component.html',
  styleUrls: ['./create-platform.component.css']
})
export class CreatePlatformComponent implements OnInit {

  platformForm!: FormGroup;
  placeholderIngresarNombre: String;
  placeholderIngresarUrl: String;
  @Output() refreshListPlatform = new EventEmitter();
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(private platformService: PlatformService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) {
    this.placeholderIngresarNombre = $localize`:@@placeholder.ingresar.nombre:Ingresar nombre`;
    this.placeholderIngresarUrl = $localize`:@@placeholder.ingresar.url:Ingresar url`;



  }

  ngOnInit(): void {
    this.platformForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      url: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(200), Validators.pattern('^https?://.+')]]
    });
  }

  createPlatform(platform: Platform){

    this.platformService.createPlatform(platform).subscribe({
     next: () => {
      const message = $localize`:@@dialog.platform.create.success:La plataforma se ha creado con exito`
      this.showDialog('success',message, 'Ok');
      this.closePopup();
      this.refreshListPlatform.emit();
    },
     error: () => {
      const message = $localize`:@@dialog.platform.create.error:Se ha producido un error a la hora de crear el actor, porfavor contacte con el administrador`
      this.showDialog('error', message, 'Ok');
     }
    });
  }

  showDialog(icon: SweetAlertIcon, title: string, confirmButtonText: string) {
    Swal.fire({
      icon: icon,
      title: title,
      confirmButtonText: confirmButtonText,
    });
  }
  closePopup(){
    this.platformForm.reset();
    this.closeBtn.nativeElement.click();
    this.activeModal.dismiss();
  }

}
