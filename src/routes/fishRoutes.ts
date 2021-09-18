import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishWikiController';

const fishWikiRoutes = Router();

const fishWikiController = new FishController();

fishWikiRoutes.post('/', (req: Request, res: Response) => {
  fishWikiController.createFish(req, res);
});

fishWikiRoutes.get('/', (req: Request, res: Response) => {
  fishWikiController.getAllFish(req, res);
});

fishWikiRoutes.get('/:id', (req: Request, res: Response) => {
  fishWikiController.getOneFishWiki(req, res);
});

export default fishWikiRoutes;
