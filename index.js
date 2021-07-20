const express = require("express");
const cors = require("cors");
const knex = require("knex");
const databaseConfig = require("./knexfile").development

const app = express();
const database = knex(databaseConfig);

app.use(cors());

app.get("/", (request, response) => {
    response.json({ message: "You're in flavor country!" })
})

app.listen(4000);