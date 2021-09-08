import { Request, Response } from 'express';
import AuthService from '../middleware/auth';
import FishWiki from '../models/fishWiki';

const auth = new AuthService();

export default class FishController {
  createFish = async (req: Request, res: Response) => {
    try {
      if (!(req.body.fishType || req.body.specie || req.body.photo)) {
        return res.status(400).json({
          message:
            'Registro não foi criado, é necessário o tipo, a espécie ou a foto para a criação de um registro.',
        });
      }
      const fish = await FishWiki.create(req.body);

      return res.status(200).json({ fish });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Falha no sistema de criação de registro, tente novamente!',
      });
    }
  };

  getAllFish = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const data = JSON.parse(await auth.decodeToken(token as string));
        const allFishWiki = await FishWiki.find({});
  
        if (!allFishWiki) {
          return res.status(404).json({
            message: 'Nenhum peixe cadastrado',
          });
      }
      else{
          return res.status(200).json(allFishWiki)
      }       
  
       } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Falha ao processar requisição',
        });
      }
  };

  getOneFishWiki = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const fishId = req.params.id;
      const fishWiki = await FishWiki.findById(fishId);

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
    }
    else{
        return res.status(200).json(fishWiki)
    }       

     } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
