const express = require('express');
const router = require('./routes');

// Configure and start the API
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
