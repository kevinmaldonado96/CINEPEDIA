import { Component, OnInit } from '@angular/core';
import { Actor } from '../actor';
import { ActorStatus } from '../actor-status';
import { ActorService } from '../actor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  idActor: string;
  actorDetail: Actor | undefined;
  actorStatus!: ActorStatus;
  invalidId: string;

  constructor(private actorService: ActorService,
    private location: Location,
    private route: ActivatedRoute) {

    this.idActor = this.route.snapshot.params['id'];
    this.getActorDetail(this.idActor);

    this.invalidId = '00000000-0000-0000-0000-000000000000';
  }

  ngOnInit(): void {
  }


  getActorFromFilters(actorId: string) {
   // this.closeBtn.nativeElement.click();
   this.idActor = actorId;
    this.location.go(`actor/${this.idActor}`);
    this.getActorDetail(this.idActor);
  }

  getActorDetail(idActor: String) {
    this.actorService.getActorDetail(idActor).subscribe({
      next: (actor) => {
        this.actorDetail = actor;
      }
   /*   error: (error) => {
        this.getInvalidActor();
      }*/
    })

  }

  getInvalidActor() {
    this.actorService.getActorDetail(this.invalidId).subscribe({
      error: (actorStatus) => this.showPopUpError(actorStatus.error.message)
    }
    );
  }

  showPopUpError(message: String): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: $localize`:@@dialog.requets.solicitude.error:Ocurrió un error al procesar la solicitud, por favor contacte al administrador`,
      confirmButtonText: 'Ok'
    })
  }

  backToActors(): void {}
}
