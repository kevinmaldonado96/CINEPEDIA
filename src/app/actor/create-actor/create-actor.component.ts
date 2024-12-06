import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ActorService } from '../actor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from '../actor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  actorForm!: FormGroup;
  placeholderIngresarNombre: String;
  placeholderIngresarFoto: String;
  placeholderIngresarNacionalidad: String;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output() refreshListActors = new EventEmitter();


  constructor(private actorService: ActorService,
      private formBuilder: FormBuilder,
      private activeModal: NgbActiveModal) {
      this.placeholderIngresarNombre = $localize`:@@placeholder.ingresar.nombre:Ingresar nombre`;
      this.placeholderIngresarFoto = $localize`:@@placeholder.ingresar.foto:Ingresar foto`;
      this.placeholderIngresarNacionalidad = $localize`:@@placeholder.ingresar.nacionalidad:Ingresar nacionalidad`;


  }

  ngOnInit(): void {
    this.actorForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      photo: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(200), Validators.pattern('^https?://.+')]],
      nationality: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      birthDate: ["", [Validators.required]],
      biography: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });
  }

  createActor(actor: Actor){

    this.actorService.createActor(actor).subscribe({
     next: (actor: Actor) => {
      this.refreshListActors.emit();
      this.closePopup();

      const message = $localize`:@@dialog.actor.create.success:El actor se ha creado con exito`
      this.showDialog('success', message, 'Ok');
    },
     error: (error) => {
      const message = $localize`:@@dialog.actor.create.error:El actor se ha creado con exito`
      this.showDialog('error', `Se ha producido un error a la hora de crear el actor, porfavor contacte con el administrador`, 'Ok');
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
    this.actorForm.reset();
    this.closeBtn.nativeElement.click();
    this.activeModal.dismiss();
  }
}
