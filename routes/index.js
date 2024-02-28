const SoundController = require("../controllers/sound");
const CategoryController = require("../controllers/category");
const UserController = require("../controllers/user");
const category = require('../models/category');
const sound = require('../models/sound');
const user = require('../models/user');
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcryptjs");

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

    //Fonction gérant l'enregistrement
    server.post("/users/signup", (req, res) => {
        if (!checkBody(req.body, ["username", "password"])) {
            res.json({ result: false, error: "Champs invalides ou vides" });
            return;
        }
        const hash = bcrypt.hashSync(req.body.password, 10);

        // si la valeur n'existe pas dans la BDD, le result est true
        user.findOne({ username: req.body.username}).then((data) => {
            if (data === null) {
                const newUser = new user({
                    username: req.body.username,
                    password: hash,
                    token: uid2(32),
                });
                newUser.save().then((data) => {
                    const newUserWithoutPassword = {
                        username: data.username,
                        token: data.token,
                    };
                    res.json({ result: true, newUser: newUserWithoutPassword });
                });
            } else {
                res.json({ result: false, error: "Login déjà existant" });
            }
        });
    });

    // signin de la page login
    server.post("/users/signin", (req, res) => {
        console.log(req.body.username, req.body.password);
        if (!checkBody(req.body, ["username", "password"])) {
            res.json({ result: false, error: "Champs invalides ou vides" });
            return;
        }
        const hash = bcrypt.hashSync(req.body.password, 10);

        // si la valeur existe dans la BDD, le result est true
        user.findOne({ username: req.body.username }).then((data) => {
            if (data && bcrypt.compareSync(req.body.password, data.password)) {
                console.log("ok");
                res.json({
                    result: true, newUser: {
                        username: data.username,
                        token: data.token,
                    }

                });
            } else {
                res.json({ result: false, error: "Login introuvable" });
            }
        });
    });


    server.get("/sounds", (req, res) => {
        SoundController.getAll(req, res);
    });

    server.get("/categories", (req, res) => {
        CategoryController.getAll(req, res);
    });

    server.get("/categories/:id", (req, res) => {
        CategoryController.get(req, res);
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