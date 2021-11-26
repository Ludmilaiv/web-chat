/** Для Задания 4 */
const Message = require('../models/message');
/** ------------ */

exports.index = function (req, res) {
  if (!req.session.user) {
    return (res.redirect("/users/authorization"));
  }
  /** Для Задания 4 */
  Message.find({}, function(err, docs) {
    // разворачиваем массив в обратном порядке, так как у нас 
    // на странице вверху должны быть новые сообщения, а внизу старые
    const messages = docs.reverse();
    res.render("chat", {title: "Web-chat", 
                user: req.session.user,
                messages: messages
              });
  });
  /** ------------ */

};



