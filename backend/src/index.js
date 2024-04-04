const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const chatRoutes = require('./routes/chatRoutes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', chatRoutes);

app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
