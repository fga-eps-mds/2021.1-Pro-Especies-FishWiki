import { Request, Response } from 'express';
import FishWiki from '../models/fishWiki';

export default class FishController {
  createFish = async (req: Request, res: Response) => {
    try {
      if (!req.body.species) {
        return res.status(400).json({
          message:
            'Peixe não foi criado, é necessário a espécie para a criação de um registro.',
        });
      }
      const fish = await FishWiki.create(req.body);

      return res.status(200).json({ fish });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Falha no sistema de criação de peixe, tente novamente!',
      });
    }
  };

  getAllFish = async (req: Request, res: Response) => {
    try {
      const allFishWiki = await FishWiki.find({});

      if (!allFishWiki) {
        return res.status(404).json({
          message: 'Nenhum peixe cadastrado',
        });
      }
      return res.status(200).json({ allFishWiki });
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
