
// Controller function 404
exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found", layout: false, path: '' });
};