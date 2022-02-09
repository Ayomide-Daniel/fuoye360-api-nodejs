const S3_BUCKET = process.env.AWS_S3_BUCKET;
module.exports = {
  S3_BUCKET: S3_BUCKET,
  aws: require("aws-sdk"),
};
