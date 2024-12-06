import {Platform} from "../platform/platform";

export class MoviePlatform {
  idMovie: string;
  platform: Platform;

  constructor() {
    this.idMovie = '';
    this.platform = new Platform();
  }

  static fromAllAttributesInstance(
    idMovie: string,
    platform: Platform
  ): MoviePlatform {
    let moviePlatformIds = new MoviePlatform();
    moviePlatformIds.platform = platform;
    moviePlatformIds.idMovie = idMovie;
    return moviePlatformIds;
  }
}
