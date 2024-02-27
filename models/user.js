const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    favs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }]
});


const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
