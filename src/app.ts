import * as express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('It worked');
});

app.listen(port, () => {
  // if (err) {
  //   return console.error(err);
  // }
  return console.log(`server is listening on ${port}`);
});
