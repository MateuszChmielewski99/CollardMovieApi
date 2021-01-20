import {
  AddCommentRequest,
  Movie,
  MovieListingRequest,
  MovieListingResponse,
  RemoveCommentRequest,
} from 'collard_movies_model';
import { inject, Lifecycle, scoped } from 'tsyringe';
import { createMovieContract } from '../../factories/MovieContract.factory';
import { IMovieRepository } from '../../repositories/movie-repository/IMovieRepository';
import { IMovieService } from './IMovieService';

@scoped(Lifecycle.ResolutionScoped)
export class MovieService implements IMovieService {
  constructor(
    @inject('IMovieRepository') private repository: IMovieRepository,
  ) {}

  public async getById(id: number) {
    const queryResult = await this.repository.getOne(id);
    if (!queryResult) return;

    const movieContract = createMovieContract(queryResult);
    return movieContract;
  }

  public async getListingData(request: MovieListingRequest) {
    const { genre, orderBy, limit } = request;

    const result = await this.repository.getListingData(
      genre!,
      orderBy || 'year',
      limit!
    );

    if (!result) return undefined;

    const movieListingResult: MovieListingResponse = {
      result,
    };

    return movieListingResult;
  }

  public async getHighestRated(limit: number) {
    const result = await this.repository.getHighestRated(limit);

    return result ? result.map(s => createMovieContract(s)) : undefined;
  }

  public async getNewest(limit: number) {
    const pipeline: object[] = [
      {
        $sort: {
          year: -1,
        },
      },
      {
        $limit: limit,
      },
    ];

    const result = await this.repository.agregate<Movie>(pipeline);
    return result ? result.map(s => createMovieContract(s)) : undefined;
  }

  public async addComment(request: AddCommentRequest): Promise<void> {
    const movie = (await this.repository.getOne(Number(request.movieId)))!;

    if (movie.comments) movie.comments = [...movie.comments, request.comment];
    
    else movie.comments = [request.comment];

    await this.repository.update(movie);
  }

  public async removeComment(request: RemoveCommentRequest): Promise<void> {
    const movie = await this.repository.getOne(Number(request.movieId));

    if (!movie) throw new Error('Movie with given id does not exist');

    if (!movie.comments) throw new Error('Cannot delete comment');

    const filteredComments = movie.comments.filter(
      comment => comment.id !== request.commentId
    );
    movie.comments = filteredComments;
    await this.repository.update(movie);
  }
}
