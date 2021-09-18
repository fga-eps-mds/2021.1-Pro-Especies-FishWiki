import { Response, Request } from 'express';
import WikiController from '../../src/controllers/fishWikiController';
import fishWiki from '../../src/models/fishWiki';

const wikiController = new WikiController();
const wikiMock = {
  _id: '32423423565',
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockRequestDefault = {} as Request;

mockRequestDefault.body = {
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockReq = {} as Request;
mockReq.params = {};

mockReq.body = {
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test create Wiki function', () => {
  it('should get status code 200', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      largeGroup: 'couro',
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };
    const response = mockResponse();
    fishWiki.findOne = jest.fn();
    jest
      .spyOn(fishWiki, 'create')
      .mockImplementationOnce(() => Promise.resolve());
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a status code 409 if provided already used species', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      largeGroup: 'couro',
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };

    const response = mockResponse();
    fishWiki.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(wikiMock),
    }));

    jest
      .spyOn(fishWiki, 'create')
      .mockImplementationOnce(() => Promise.resolve());
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });
  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    fishWiki.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.getAllFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get All Wiki function', () => {
  it('should get a status code 200', async () => {
    const response = mockResponse();
    fishWiki.find = jest.fn().mockResolvedValueOnce([wikiMock]);
    const res = await wikiController.getAllFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a status code 404 no fish registered', async () => {
    const response = mockResponse();
    fishWiki.find = jest.fn().mockResolvedValueOnce([]);
    const res = await wikiController.getAllFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    fishWiki.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.getAllFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get One Wiki function', () => {
  it('should get a status code 200', async () => {
    const response = mockResponse();
    fishWiki.findById = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));
    const res = await wikiController.getOneFishWiki(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* it('should get a status code 404 fish not found', async () => {
    mockReq.params.id = '0';
    const response = mockResponse();
    fishWiki.findById = jest.fn().mockResolvedValueOnce({});
    const res = await wikiController.getOneFishWiki(
      mockRequestDefault,
      response
    );
    expect(res.status).toHaveBeenCalledWith(404);
  }); */
  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    fishWiki.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.getOneFishWiki(
      mockRequestDefault,
      response
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Filter Wiki function', () => {
  // it('should get a status code 200', async () => {
  //   const response = mockResponse();
  //   fishWiki.find = jest.fn().mockImplementationOnce(() => ({
  //     select: jest.fn().mockResolvedValueOnce([wikiMock]),
  //   }));
  //   const res = await wikiController.filterFishWiki(mockReq, response);
  //   console.log(res);
  //   expect(res.status).toHaveBeenCalledWith(200);
  // });

  // it('should get a status code 404 no fish registered', async () => {
  //   const response = mockResponse();
  //   fishWiki.find = jest.fn().mockResolvedValueOnce([]);
  //   const res = await wikiController.filterFishWiki(
  //     mockRequestDefault,
  //     response
  //   );
  //   expect(res.status).toHaveBeenCalledWith(404);
  // });
  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    fishWiki.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.filterFishWiki(
      mockRequestDefault,
      response
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
