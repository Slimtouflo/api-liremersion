const SoundController = require("../controllers/sound");
const CategoryController = require("../controllers/category");
const UserController = require("../controllers/user");

module.exports = server => {
    server.get("/", (req, res) => {
        console.log("Bienvenue sur la page d'accueil de l'api LireMersion");

        res.send({
            message: "Bienvenue sur la page d'accueil de l'api LireMersion"
        });
    });

    server.get("/sounds", (req, res) => {
        SoundController.getAll(req, res);
    });

    server.get("/sounds/:id", (req, res) => {
        SoundController.get(req, res);
    });

    server.post("/sounds", (req, res) => {
        SoundController.create(req, res);
    });

    server.delete("/sounds/:id", (req, res) => {
        SoundController.delete(req, res);
    });


    server.get("/categories", (req, res) => {
        CategoryController.getAll(req, res);
    });

    server.get("/categories/:id", (req, res) => {
        CategoryController.get(req, res);
    });

    server.post("/categories", (req, res) => {
        CategoryController.create(req, res);
    });

    server.delete("/categories/:id", (req, res) => {
        CategoryController.delete(req, res);
    });

    server.get("/users", (req, res) => {
        UserController.getAll(req, res);
    });

    server.get("/users/:id", (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", (req, res) => {
        UserController.create(req, res);
    });

    server.delete("/users/:id", (req, res) => {
        UserController.delete(req, res);
    });
}