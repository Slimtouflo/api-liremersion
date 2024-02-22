const SoundModel = require("../models/sound");

module.exports = {
    getAll(req, res) {
        SoundModel.find().then(sounds => {
            res.send(sounds);
        });
    },

    get(req, res) {
        const id = req.params.id;
        console.log("Récupération du son avec l'id", id);

        SoundModel.findById(id).then(sounds => {
            res.send(sounds);
        });
    },

    create(req, res) {
        const sound = new SoundModel({
            name: req.body.name,
            idCategory: req.body.idCategory,
            duration: req.body.duration,
            listened: req.body.listened,
            uploadDate: new Date(req.body.uploadDate),
            image: req.body.image,
            colorId: req.body.colorId
        });

        sound.save().then(() => {
            res.send({
                response: `Création du son ${sound.name} OK`
            });
        });
    },

    delete(req, res) {
        const id = req.params.id;

        SoundModel.findByIdAndDelete(id).then(sound => {
            res.send({
                response: `Suppression du son ${sound.name} OK`
            });
        });
    }
}