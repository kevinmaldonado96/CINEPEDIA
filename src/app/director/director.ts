export class Director {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  totalMovies: number;

  public constructor(
    id: string,
    name: string,
    photo: string,
    nationality: string,
    totalMovies: number
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.nationality = nationality;
    this.totalMovies = totalMovies;
  }
}
