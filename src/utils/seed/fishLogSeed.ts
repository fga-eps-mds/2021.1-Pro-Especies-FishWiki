import FishWiki from '../../models/fishWiki';

const fishes: any[] = [];

const fishLogSeed = async () => {
  try {
    const fishWiki = await FishWiki.find();
    console.log(fishWiki);
    for (let i = 0; i < fishes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await FishWiki.create(fishes[i]);
    }
    console.log('Planilha populada com sucesso!');
  } catch (error) {
    console.log('Não foi possível popular a planilha!');
    console.log(error);
  }
};

export default fishLogSeed;
