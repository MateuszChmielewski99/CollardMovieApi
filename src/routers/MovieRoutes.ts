import express, { Router } from 'express';
import { container } from 'tsyringe';
import { MovieController } from '../controllers/MovieController';
const MovieRouter: Router = express.Router();

MovieRouter.get('/', (req, res) =>
  container.resolve(MovieController).getById(req, res)
);
MovieRouter.get('/listing', (req, res) =>
  container.resolve(MovieController).getListing(req, res)
);
MovieRouter.get('/top', (req, res) =>
  container.resolve(MovieController).getHighesRated(req, res)
);
MovieRouter.put('/comment', (req, res) =>
  container.resolve(MovieController).addNewComment(req, res)
);
MovieRouter.delete('/comment', (req, res) =>
  container.resolve(MovieController).removeComment(req, res)
);
MovieRouter.get('/newest', (req, res) =>
  container.resolve(MovieController).getNewest(req, res)
);

export default MovieRouter;
