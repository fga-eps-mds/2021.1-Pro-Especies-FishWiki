import { Router } from 'express';
// Rotas
import fishWikiRoutes from './fishRoutes';

const router = Router();

router.use('./fishWiki', fishWikiRoutes);

export default router;
