import { Movie, MovieContract } from 'collard_movies_model';

export const createMovieContract = (soruce: Movie): MovieContract => {
  const { _id, ...rest } = soruce;
  return {
    id: _id,
    ...rest,
  };
};
