const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: String,
    image: String,
    idUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    soundId: [{type: mongoose.Schema.Types.ObjectId, ref: 'sound'}]
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;