export class DirectorCreate {
  name: string;
  photo: string;
  nationality: string;
  birthDate: Date;
  biography: string;

  public constructor(
    name: string,
    photo: string,
    nationality: string,
    birthDate: Date,
    biography: string
  ) {
    this.name = name;
    this.photo = photo;
    this.nationality = nationality;
    this.birthDate = birthDate;
    this.biography = biography;
  }
}
