const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: String,
    image: String,
    idCategory: String,
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;