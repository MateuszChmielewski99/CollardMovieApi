import {
  AddCommentRequest,
  MovieContract,
  MovieListingRequest,
  MovieListingResponse,
  RemoveCommentRequest,
} from 'collard_movies_model';

export interface IMovieService {
  getById(id: number): Promise<MovieContract | undefined>;
  getListingData(
    request: MovieListingRequest
  ): Promise<MovieListingResponse | undefined>;
  getHighestRated(limit:number):Promise<MovieContract[] | undefined>;
  addComment(request:AddCommentRequest):Promise<void>;
  removeComment(request:RemoveCommentRequest):Promise<void>;
  getNewest(limit:number):Promise<MovieContract[] | undefined>;
}
