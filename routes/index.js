const SoundController = require("../controllers/sound");
const CategoryController = require("../controllers/category");
const UserController = require("../controllers/user");
const category = require('../models/category');
const sound = require('../models/sound');
const user = require('../models/user');


category.find({})
  .populate('soundId')
  .then(category => {
    console.log(category);
  });

sound.find({})
  .populate('catId')
  .then(sound => {
    console.log(sound);
  });

user.find({})
  .populate('favs')
  .then(sound => {
    console.log(sound);
  });


module.exports = server => {

    server.get("/", (req, res) => {
        console.log("Bienvenue sur la page d'accueil de l'api LireMersion");

        res.send({
            message: "Bienvenue sur la page d'accueil de l'api LireMersion"
        });
    });

    server.post('/register', async (req, res) => {
        try {
            const { user, pwd } = req.body;
            // Check if user already exists
            const existingUser = await user.findOne({ user });
            if (existingUser) {
                return res.status(409).json({ error: 'Utilisateur déjà existant' });
            }
            // Create new user
            const newUser = new user({ name, password });
            await newUser.save();
            res.status(201).json({ message: 'Enregistrement réussi !' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur' });
        }
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