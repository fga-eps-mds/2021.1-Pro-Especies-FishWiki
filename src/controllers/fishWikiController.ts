import { Request, Response } from 'express';
import { Dropbox } from 'dropbox';
import FishWiki from '../models/fishWiki';

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');

interface IProperty {
  largeGroup: string;
  group: string;
  commonName: string;
  scientificName: string;
  family: string;
  food: string;
  habitat: string;
  maxSize: number;
  maxWeight: number;
  isEndemic: string;
  isThreatened: string;
  hasSpawningSeason: string;
  wasIntroduced: string;
  funFact: string;
  photo: string;
}

interface ISheet {
  Plan1: IProperty[];
  Plan2: object[];
  Plan3: object[];
}

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
        'largeGroup group commonName scientificName family food habitat sizeMax maxWeight isEndemic isThreatened hasSpawningSeason wasIntroduced funFact photo'
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

  updateFishWiki = async (req: Request, res: Response) => {
    try {
      const dbx = new Dropbox({
        accessToken: process.env.DROPBOX_TOKEN,
      });
      dbx
        .filesDownload({ path: '/DataBase-APP-PESCA-1.xlsx' })
        .then((response: any) => {
          const filepath = path.join(__dirname, 'planilha-dados.xlsx');
          fs.writeFile(
            filepath,
            response.result.fileBinary,
            'binary',
            (err: any) => {
              if (err) {
                throw err;
              }
            }
          );
        })
        .catch((error: any) => {
          console.log(error);
        });

      const result: ISheet = excelToJson({
        sourceFile: 'src/controllers/planilha-dados.xlsx',
        header: {
          rows: 1,
        },
        columnToKey: {
          A: 'largeGroup',
          B: 'group',
          C: 'commonName',
          D: 'scientificName',
          E: 'family',
          F: 'food',
          G: 'habitat',
          H: 'sizeMax',
          I: 'maxWeight',
          J: 'isEndemic',
          K: 'isThreatened',
          L: 'hasSpawningSeason',
          M: 'wasIntroduced',
          N: 'funFact',
          O: 'HasPhoto',
        },
      });
      result.Plan1.forEach(async (element: IProperty) => {
        const findFish = await FishWiki.findOne({
          scientificName: element.scientificName,
        });
        if (!findFish) {
          await FishWiki.create(element);
        } else {
          await FishWiki.findOneAndUpdate(
            {
              scientificName: element.scientificName,
            },
            element
          );
        }
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
