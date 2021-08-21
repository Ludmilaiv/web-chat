exports.index = function (req, res) {
  res.render("index", {title: "Web-chat", 
                date: (new Date()).toDateString(),
                layout: './layouts/main-layout'});
};

exports.about = function (req, res) {
  res.render("about", {title: "Web-chat", 
              layout: './layouts/main-layout'});
};

