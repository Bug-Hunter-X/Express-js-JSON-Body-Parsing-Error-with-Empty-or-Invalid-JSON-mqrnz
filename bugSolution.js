const express = require('express');
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(400).send({ error: 'Invalid JSON' });
  } else {
    next();
  }
});
app.post('/data', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'Empty request body' });
  } // Add further validation if necessary
  console.log(req.body);
  res.send('Data received');
});
app.listen(3000, () => console.log('Server started on port 3000'));