export class DirectorDetails {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: Date;
  biography: string;
  movies: any[];

  public constructor(
    id: string,
    name: string,
    photo: string,
    nationality: string,
    birthDate: Date,
    biography: string,
    movies: any[]
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.nationality = nationality;
    this.birthDate = birthDate;
    this.biography = biography;
    this.movies = movies;
  }
}
