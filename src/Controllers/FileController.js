const { getFile } = require("../../config/s3.config");

exports.getSomeFile = (req, res) => {
  const { key, field } = req.params;
  const readStream = getFile(key, field);
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  readStream.pipe(res);
};
