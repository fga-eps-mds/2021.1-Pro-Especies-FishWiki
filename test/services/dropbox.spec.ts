import { Dropbox } from 'dropbox';

const getSheet = require('../../src/services/dropbox/getSheet');

jest.mock('dropbox', () => ({
  ...jest.requireActual('dropbox'),
  Dropbox: { ...Dropbox, filesDownload: jest.fn(() => {}) },
}));

describe('Test get sheet from dropbox function', () => {
  it('should return not null', async () => {
    const response = await getSheet('/DataBase-APP-PESCA-1.xlsx');
    expect(response).not.toBeNull();
  });
});
