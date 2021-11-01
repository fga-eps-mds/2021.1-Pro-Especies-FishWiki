import app from './app';

const serverPort = process.env.PORT || 4002

app.listen(serverPort, () => {
  console.log(`server running on port %d`, serverPort);
});
