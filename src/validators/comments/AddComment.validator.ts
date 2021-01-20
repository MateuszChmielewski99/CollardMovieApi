import { AddCommentRequest } from 'collard_movies_model';
import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../../repositories/movie-repository/IMovieRepository';
import { ValidationResult } from '../../types/ValidationResult';
import { IValidator } from '../IValidator';

@injectable()
export class AddCommentValidator implements IValidator<AddCommentRequest> {
  constructor(
    @inject('IMovieRepository') private repository: IMovieRepository
  ) {}

  async validate(request: AddCommentRequest) {
    const result: ValidationResult = {
      reason: '',
      result: true,
    };
    const movie = await this.repository.getOne(Number(request.movieId));

    if (!movie) {
      result.reason = 'Movie with given id does not exist';
      result.result = false;
    }
    return result;
  }
}
