exports.index = function (req, res) {
  if (!req.session.user) {
    return (res.redirect("/users/authorization"));
  }
  res.render("chat", {title: "Web-chat", 
                user: req.session.user});
};



