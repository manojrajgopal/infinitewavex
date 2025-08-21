const path = require('path');
const express = require('express');
const app = express();

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Listening on ${port}`));
