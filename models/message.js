
/** Для Задания 4 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageScheme = new Schema({
  userName: {
    type: String,
    required: true,
  },
  text: String
});

const Message = mongoose.model('Message', messageScheme);

module.exports = Message;

