export class GenreList {
  id: string;
  type: string;
  movies: any[];

  public constructor(
    id: string,
    type: string,
    movies: any[],
  ) {
    this.id = id;
    this.type = type;
    this.movies = movies;
  }
}
