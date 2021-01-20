import { Movie } from 'collard_movies_model';
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
