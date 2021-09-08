import { Router } from 'express';
// Rotas
import fishWikiRoutes from './fishWikiRoutes';

const router = Router();

router.use('/fishWiki', fishWikiRoutes);

export default router;