const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { diSetup } = require("./dependency-injection-setup/di-setup");

diSetup();

const router = require("./api/router");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", router);

app.listen(3000, () => console.log("Listening on port: 3000"));