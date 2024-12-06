import { Movie } from "../movie/movie";

export class Platform {
  id: string;
  name: string;
  url: string;
  movies: Movie[];

  constructor() {
    this.id = "";
    this.name = "";
    this.url = "";
    this.movies = [];
  }

  static fromAllAttributesInstance(
    id: string,
    name: string,
    url: string
  ): Platform {
    let platform = new Platform();
    platform.id = id;
    platform.name = name;
    platform.url = url;
    return platform;
  }
}
