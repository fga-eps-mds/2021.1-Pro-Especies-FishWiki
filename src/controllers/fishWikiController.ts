import { Request, Response } from 'express';
import FishWiki from '../models/fishWiki';

export default class FishController {
  createFish = async (req: Request, res: Response) => {
    try {
      const { scientificName } = await req.body;
      if (await FishWiki.findOne({ scientificName })) {
        return res.status(409).json({
          message: 'Essa espécie de peixe já foi cadastrada',
        });
      }
      await FishWiki.create(req.body);
      return res.status(200).json(req.body);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllFish = async (req: Request, res: Response) => {
    try {
      const allFishWiki = await FishWiki.find(
        {},
        'largeGroup group commonName scientificName family food habitat maxSize maxWeight isEndemic isThreatened hasSpawningSeason wasIntroduced funFact photo'
      );

      if (!allFishWiki.length) {
        return res.status(404).json({
          message: 'Nenhum peixe cadastrado',
        });
      }
      return res.status(200).json(allFishWiki);
    } catch (error) {
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
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  filterFishWiki = async (req: Request, res: Response) => {
    try {
      const {
        largeGroup,
        group,
        family,
        habitat,
        maxSize,
        maxWeight,
        isEndemic,
        isThreatened,
        wasIntroduced,
      } = req.query;
      const query: any = {};
      if (group) query.group = group;
      if (largeGroup) query.largeGroup = largeGroup;
      if (family) query.family = family;
      if (habitat) query.habitat = habitat;
      if (maxSize) query.maxSize = maxSize;
      if (maxWeight) query.maxWeight = maxWeight;
      if (isEndemic) query.isEndemic = isEndemic;
      if (isThreatened) query.isThreatened = isThreatened;
      if (typeof wasIntroduced !== 'undefined')
        query.wasIntroduced = wasIntroduced;

      console.log(req.query);
      const allFishWiki = await FishWiki.find(query);

      if (!allFishWiki.length) {
        return res.status(404).json({
          message: 'Nenhum peixe cadastrado com essas características',
        });
      }
      return res.status(200).json(allFishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
