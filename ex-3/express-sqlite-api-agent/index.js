const express = require('express');
const config = require('./config');
const app = express();
const port = 3000 || process.env.PORT;
const monitorRouter = require('./routes/monitor');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/monitor', monitorRouter);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

if (config.runAgentInBackgroundWhenLaunchAPI){
  require('./agent');
}
