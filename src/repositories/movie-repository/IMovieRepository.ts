import { Movie, MovieListingItem } from 'collard_movies_model';
import { IBaseRepository } from '../base-repository/IBaseRepository';

export interface IMovieRepository extends IBaseRepository<Movie> {
  getListingData(
    genre: string,
    orderBy: string,
    limit:number
  ): Promise<MovieListingItem[] | undefined>;
  getHighestRated(limit:number):Promise<Movie[] | undefined>;
}
