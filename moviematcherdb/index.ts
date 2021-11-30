const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./DB');
const Router = require('./Router')

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(Router);
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