const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const tokens = new Set();

app.post('/register-token', (req, res) => {
  const { token } = req.body;
  if (token) {
    tokens.add(token);
    console.log('Token registrato:', token);
    res.sendStatus(200);
  } else {
    res.status(400).send('Token mancante');
  }
});

app.get('/tokens', (req, res) => {
  res.json([...tokens]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
