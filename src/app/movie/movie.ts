import {YoutubeTrailer} from "./youtube-trailer";
import {Director} from "../director/director";
import {Actor} from "../actor/actor";
import {Review} from "./review";
import {Platform} from "../platform/platform";

export class Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  youtubeTrailer: YoutubeTrailer;
  director: Director;
  actors: Actor[];
  platforms: Platform[];
  reviews: Review[];
  constructor() {
    this.id = '';
    this.title = '';
    this.poster = '';
    this.duration =  -1;
    this.country = '';
    this.releaseDate = '';
    this.popularity = -1;
    this.youtubeTrailer = new YoutubeTrailer('','','',-1,'');
    this.director = new Director('', '', '', '', -1);
    this.actors = [];
    this.platforms = [];
    this.reviews = [];
  }
  static fromAllAttributesInstance(
   id: string,
   title: string,
   poster: string,
   duration: number,
   country: string,
   releaseDate: string,
   popularity: number,
   youtubeTrailer: YoutubeTrailer,
   director: Director,
   actors: Actor[],
   platforms: Platform[],
   reviews: Review[]): Movie{
    let movie = new Movie();
    movie.id = id;
    movie.title = title;
    movie.poster = poster;
    movie.duration = duration;
    movie.country = country;
    movie.releaseDate = releaseDate;
    movie.popularity = popularity;
    movie.youtubeTrailer = youtubeTrailer;
    movie.director = director;
    movie.actors = actors;
    movie.platforms = platforms;
    movie.reviews = reviews;
    return movie;
  }
}
