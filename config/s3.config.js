require("dotenv").config();

// const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretKey,
});
const { Readable } = require("stream");

// uploads a file
exports.uploadFile = (data, fieldname, renamedFile) => {
  const fileStream = Readable.from(data);
  try {
    const uploadParams = {
      Bucket: `${bucketName}/${fieldname}`,
      Body: fileStream,
      Key: renamedFile,
    };

    return s3.upload(uploadParams).promise();
  } catch (error) {
    console.log(error);
  }
};

// downloads a file
exports.getFile = (key, fieldname) => {
  try {
    const downloadParms = {
      Bucket: `${bucketName}/${fieldname}`,
      Key: key,
    };

    return s3.getObject(downloadParms).createReadStream();
  } catch (error) {
    console.log(error);
  }
};
