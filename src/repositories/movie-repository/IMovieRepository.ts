import { Movie } from 'collard_movies_model';
import { IBaseRepository } from '../base-repository/IBaseRepository';

export interface IMovieRepository extends IBaseRepository<Movie> {
  getHighestRated(limit:number):Promise<Movie[] | undefined>;
}
