import { Movie } from "../movie/movie";

export class Actor {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: Date;
    biography: string;
    movies: Movie[];

    constructor(){
        this.id = '';
        this.name = '';
        this.photo = '';
        this.nationality = '';
        this.birthDate = new Date();
        this.biography = '';
        this.movies = [];
    }

      static fromAllAttributes(
        id: string,
        name: string,
        photo: string,
        nationality: string,
        birthDate: Date,
        biography: string,
        movies: Movie[]
      ): Actor {
        let actor = new Actor();
        actor.id = id;
        actor.name = name;
        actor.photo = photo;
        actor.nationality = nationality;
        actor.birthDate = new Date(birthDate);
        actor.biography = biography;
        actor.movies = movies;
        return actor;
      }
}
