require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index.router');
const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/todos', router);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});
