import { Movie, MovieListingItem } from 'collard_movies_model';
import { injectable, Lifecycle, scoped } from 'tsyringe';
import { BaseRepository } from '../base-repository/BaseRepository';
import { IMovieRepository } from './IMovieRepository';

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class MovieRepository extends BaseRepository<Movie>
  implements IMovieRepository {
  constructor() {
    super('movies');
  }

  public async getListingData(genre: string, orderBy: string, limit: number) {
    const $sort: any = {};
    $sort[orderBy] = -1;
    const pipeline: object[] = [
      {
        $match: {
          firstGenre: genre,
        },
      },
      { $sort },
      {
        $project: {
          id: '$_id',
          poster: '$poster',
          title: '$title',
          _id: false,
        },
      },
      {
        $limit: limit,
      },
    ];

    return this.agregate<MovieListingItem>(pipeline);
  }

  public async getHighestRated(limit: number): Promise<Movie[] | undefined> {
    const pipeline: object[] = [
      {
        $sort: {
          score: -1,
        },
      },
      {
        $limit: limit,
      },
    ];

    return super.agregate(pipeline);
  }
}
