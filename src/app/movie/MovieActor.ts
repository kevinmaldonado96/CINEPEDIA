import {Actor} from "../actor/actor";

export class MovieActor {
  idMovie: string;
  actor: Actor;

  constructor() {
    this.idMovie = '';
    this.actor = new Actor();
  }

  static fromAllAttributesInstance(
    idMovie: string,
    actor: Actor
  ): MovieActor {
    let movieActor = new MovieActor();
    movieActor.actor = actor;
    movieActor.idMovie = idMovie;
    return movieActor;
  }
}
