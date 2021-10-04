import { Dropbox } from 'dropbox';

const getSheet = async (path: string) => {
  let response: any = null;

  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_TOKEN,
  });
  response = await dbx.filesDownload({
    path,
  });
  return response;
};

module.exports = getSheet;
