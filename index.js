const express = require("express");
const server = express();
const mongoose = require('mongoose');
const routes = require("./routes");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.listen(5500, () => {
    console.log("Serveur lancé et écoute sur le port 5500");

    mongoose.connect("mongodb+srv://Remi:Liremersion@liremersiondbtest.2dlxx7y.mongodb.net/LireMersion_db");

    const db = mongoose.connection;
    db.once("open", () => console.log("Connexion à la base MongoDB ok")).on("error", error => console.error("Problème durant la connexion à la base", error));
});

routes(server);