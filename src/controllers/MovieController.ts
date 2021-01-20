import { inject, injectable } from 'tsyringe';
import { IMovieService } from '../services/movie-service/IMovieService';
import { Response, Request } from 'express';
import {
  AddCommentRequest,
  MovieListingRequest,
  RemoveCommentRequest,
} from 'collard_movies_model';
import { IValidator } from '../validators/IValidator';
import { ValidationResult } from '../types/ValidationResult';

@injectable()
export class MovieController {
  constructor(@inject('IMovieService') private service: IMovieService, @inject('IValidator<AddCommentRequest>') private addCommentValidator:IValidator<AddCommentRequest>) {}

  public async getById(request: Request, response: Response) {
    const id = Number(request.query.id);
    if (!id) return response.status(400).send('No id provided');

    const entity = await this.service.getById(id);

    if (!entity) return response.status(404).send();

    return response.json(entity);
  }

  public async getListing(request: Request, response: Response) {
    const command: MovieListingRequest = {
      genre: request.query.genre as string,
      orderBy: (request.query.orderBy as string) || 'year',
      limit: Number(request.query.limit) || 12,
    };

    if (!command.genre) return response.status(400).send('invalid request');

    const result = await this.service.getListingData(command);

    if (!result) return response.status(404).send();

    return response.json(result);
  }

  public async getHighesRated(request: Request, response: Response) {
    const limit = Number(request.query.limit) || 50;

    if (limit <= 0)
      return response.status(400).send('Limit cannot be lower than 1');

    const result = await this.service.getHighestRated(limit);

    return response.json(result || []);
  }

  public async getNewest(request: Request, response: Response) {
    const limit = Number(request.query.limit) || 50;

    if (limit <= 0)
      return response.status(400).send('Limit cannot be lower than 1');

    const result = await this.service.getNewest(limit);

    return response.json(result || {});
  }

  public async addNewComment(request: Request, response: Response) {
    const addCommentRequest: AddCommentRequest = request.body;

    const validationResult:ValidationResult = await this.addCommentValidator.validate(addCommentRequest);

    if(!validationResult.result){
      response.status(400).send(validationResult);
    }

    await this.service.addComment(addCommentRequest);
  
    return response.sendStatus(200);
  }

  public async removeComment(request: Request, response: Response) {
    const removeCommentRequest: RemoveCommentRequest = {
      commentId: request.query.commentId as string,
      movieId: request.query.movieId as string,
    };

    try {
      await this.service.removeComment(removeCommentRequest);
    } catch (e) {
      console.error(e);
      return response.sendStatus(400);
    }
    return response.sendStatus(200);
  }
}
