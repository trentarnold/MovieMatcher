const express = require('express');
const cors = require('cors');
const app = express();
const router;
const port = 3001;

app.use(cors())
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