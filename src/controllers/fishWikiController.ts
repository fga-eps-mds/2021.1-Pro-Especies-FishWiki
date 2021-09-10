import { Request, Response } from 'express';
import FishWiki from '../models/fishWiki';

export default class FishController {
  createFish = async (req: Request, res: Response) => {
    try {
      await FishWiki.create(req.body);
      return res.status(200).json(req.body);
    } catch (error) {
      const { species } = await req.body;
      if (await FishWiki.findOne({ species })) {
        return res.status(409).json({
          message: 'Essa espécie de peixe ja foi cadastrada',
        });
      }
      if (
        !['escama', 'couro', 'arraia', 'outros', 'cascudo'].includes(
          req.body.bigGroup
        )
      ) {
        return res.status(400).json({
          message: 'Esse tipo de grande grupo não é válido',
        });
      }
      return res.status(400).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllFish = async (req: Request, res: Response) => {
    try {
      const allFishWiki = await FishWiki.find(
        {},
        'fishId bigGroup group commonName species family feed habitat sizeMax weightMax endemic threatened piracema introduced trivia picture'
      );

      if (!allFishWiki) {
        return res.status(404).json({
          message: 'Nenhum peixe cadastrado',
        });
      }
      return res.status(200).json(allFishWiki);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishWiki = async (req: Request, res: Response) => {
    try {
      const fishId = req.params.id;
      const fishWiki = await FishWiki.findById(fishId);

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }
      return res.status(200).json(fishWiki);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
