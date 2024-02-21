const UserModel = require("../models/user");

module.exports = {
    getAll(req, res) {
        UserModel.find().then(users => {
            res.send(users);
        });
    },

    get(req, res) {
        const id = req.params.id;
        console.log("Récupération du user avec l'id", id);

        UserModel.findById(id).then(users => {
            res.send(users);
        });
    },

    create(req, res) {
        const user = new UserModel({
            name: req.body.name,
            password: req.body.password,
            favs: req.body.favorites
        });

        user.save().then(() => {
            res.send({
                response: `Création du user ${user.name} OK`
            });
        });
    },

    delete(req, res) {
        const id = req.params.id;

        UserModel.findByIdAndDelete(id).then(user => {
            res.send({
                response: `Suppression du user ${user.name} OK`
            });
        });
    }
}