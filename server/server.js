const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const listRouter = require('./routes/list.router');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use('/api/list', listRouter);

//LISTEN REQUEST FOR PORT
app.listen(PORT, () => {
    console.log('listening on: ', PORT);
});

