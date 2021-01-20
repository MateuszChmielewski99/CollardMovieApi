import { container } from 'tsyringe';
import { MovieRepository } from './repositories/movie-repository/MovieRepository';
import { MovieService } from './services/movie-service/MovieService';
import { AddCommentValidator } from './validators/comments/AddComment.validator';


export const bootstrap = () => {
  container.register('IMovieRepository', {
    useClass: MovieRepository,
  });
  container.register('IMovieService', {
    useClass: MovieService,
  });
  container.register('IValidator<AddCommentRequest>', {
    useClass: AddCommentValidator,
  });
};
