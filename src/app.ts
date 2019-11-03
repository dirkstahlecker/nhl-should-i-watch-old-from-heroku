import * as express from "express";

const app = express();
const port = process.env.PORT || 5000;


// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/src')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/src', 'index.html'));
  });
}



app.get('/', (req, res) => {
  res.send('It worked');
});

app.listen(port, () => {
  // if (err) {
  //   return console.error(err);
  // }
  return console.log(`server is listening on ${port}`);
});
