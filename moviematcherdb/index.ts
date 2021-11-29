const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./Router');
const port = 3001;
const DB = require('./DB');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.get('*', (req,res) => {
  res.status(404).send('The page you are looking for has not been found')
});

(async () => {
  await db.sequelize.sync();
  app.listen(port, e => {
    if (e) {
      console.log(e);
    } else {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
})();