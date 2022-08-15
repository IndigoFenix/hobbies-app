require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const env = process.env;
const host = env.BASE_URL || 'http://127.0.0.1';
const port = env.PORT || 8080;

const app = express();

const server = require('http').createServer(app);
const corsOptions = {
	//origin: "http://localhost:8081",
	origin: "*"
};
app.use(busboy());
app.use(bodyParser.json({ limit: '10000000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000000mb', extended: true }));
app.use(cors());

const db = require("./models");
db.sequelize.sync();

app.use("/api/users", require("./routes/users"));
app.use("/api/hobbies", require("./routes/hobbies"));
server.listen(port, () => console.log(`listening on port ${port} + host ${host}`));

app.use(busboy());