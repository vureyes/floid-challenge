const express = require('express');
const router = require('./routes');

// Configure and start the API
const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
