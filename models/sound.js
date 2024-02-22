const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SoundSchema = new Schema({
    name: String,
    catId: [{type: mongoose.Schema.Types.ObjectId, ref: 'category'}],
    duration: Number,
    listened: Number,
    uploadDate: Date,
    image: String,
    colorId: String
});

const SoundModel = mongoose.model("sound", SoundSchema);

module.exports = SoundModel;
