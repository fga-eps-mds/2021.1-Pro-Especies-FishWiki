import { Request, Response } from 'express';
import { Dropbox } from 'dropbox';
import FishWiki from '../models/fishWiki';

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');

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

  updateFishWiki = async (req: Request, res: Response) => {
    try {
      // const wikiFile = {};

      const dbx = new Dropbox({
        accessToken:
          '...',
      });

      dbx
        .filesDownload({ path: '/DataBase-APP-PESCA-1.xlsx' })
        .then((response: any) => {
          console.log(response);

          const filepath = path.join(__dirname, 'planilha-dados.xlsx');
          fs.writeFile(
            filepath,
            response.result.fileBinary,
            'binary',
            (err: any) => {
              if (err) {
                throw err;
              }
              console.log(`Dropbox File '${response.result.name}' saved`);
            }
          );
        })
        .catch((error: any) => {
          console.log(error);
        });

      const result = excelToJson({
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
          H: 'maxSize',
          I: 'maxWeight',
          J: 'isEndemic',
          K: 'isThreatened',
          L: 'hasSpawningSeason',
          M: 'wasIntroduced',
          N: 'funFact',
          O: 'photo',
        },
      });
      // console.log(result.Plan1);
      // result.Plan1.forEach(async (element: object) => {
      //   const findFish = await FishWiki.find({element.scientificName});
      // });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
  // ExcelToJSON = () => {
  //   this.parseExcel = function (file) {
  //     const reader = new FileReader();

  //     reader.onload = function (e) {
  //       const data = e.target.result;
  //       const workbook = XLSX.read(data, {
  //         type: 'binary',
  //       });

  //       workbook.SheetNames.forEach((sheetName) => {
  //         // Here is your object
  //         const XL_row_object = XLSX.utils.sheet_to_row_object_array(
  //           workbook.Sheets[sheetName]
  //         );
  //         const json_object = JSON.stringify(XL_row_object);
  //         console.log(json_object);
  //       });
  //     };

  //     reader.onerror = function (ex) {
  //       console.log(ex);
  //     };

  //     reader.readAsBinaryString(file);
  //   };
  // };
}
