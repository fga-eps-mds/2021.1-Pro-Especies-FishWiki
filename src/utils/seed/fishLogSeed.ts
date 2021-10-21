import FishWiki from '../../models/fishWiki';

const excelToJson = require('convert-excel-to-json');

interface IFish {
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
  Plan1: object[];
  Plan2: IFish[];
  Plan3: object[];
}

const fishLogSeed = async () => {
  const columnToKey = {
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
  };
  try {
    const fishWiki = await FishWiki.find();
    if (fishWiki.length > 0) {
      return;
    }
    const result: ISheet = await excelToJson({
      sourceFile: 'src/utils/seed/planilha-dados3.xlsx',
      header: {
        rows: 1,
      },
      columnToKey,
    });
    for (let i = 0; i < result.Plan2.length; i += 1) {
      const value = result.Plan2[i].wasIntroduced;
      if (value === undefined) {
        result.Plan2[i].wasIntroduced = '-';
      }
      const fish = {
        largeGroup: result.Plan2[i].largeGroup,
        group: result.Plan2[i].group,
        commonName: result.Plan2[i].commonName,
        scientificName: result.Plan2[i].scientificName,
        family: result.Plan2[i].family,
        food: result.Plan2[i].food,
        habitat: result.Plan2[i].habitat,
        maxSize: result.Plan2[i].maxSize,
        maxWeight: result.Plan2[i].maxWeight,
        isEndemic: result.Plan2[i].isEndemic,
        isThreatened: result.Plan2[i].isThreatened,
        hasSpawningSeason: result.Plan2[i].hasSpawningSeason,
        wasIntroduced: !!result.Plan2[i].wasIntroduced
          .toLowerCase()
          .includes('sim'),
        funFact: result.Plan2[i].funFact,
        photo: result.Plan2[i].photo,
      };
      // eslint-disable-next-line no-await-in-loop
      await FishWiki.create(fish);
    }
    console.log('Planilha populada com sucesso!');
  } catch (error) {
    console.log('Não foi possível popular a planilha!');
    console.log(error);
  }
};

export default fishLogSeed;
