const CategoryModel = require("../models/category");

module.exports = {
    getAll(req, res) {
        CategoryModel.find().then(category => {
            res.send(category);
        });
    },

    get(req, res) {
        const id = req.params.id;
        console.log("Récupartion de la catégorie avec l'id", id);

        CategoryModel.findById(id).then(category => {
            res.send(category);
        });
    },

    create(req, res) {
        const category = new CategoryModel({
            name: req.body.name,
            image: req.body.image,
            idCategory: req.body.idCategory
        });

        category.save().then(() => {
            res.send({
                response: `Création de la catégorie ${category.name} OK`
            });
        });
    },

    delete(req, res) {
        const id = req.params.id;

        CategoryModel.findByIdAndDelete(id).then(category => {
            res.send({
                response: `Suppression de la catégorie ${category.name} OK`
            });
        });
    }
}