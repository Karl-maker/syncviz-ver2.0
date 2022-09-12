const AWS = require("aws-sdk");
const config = require("../config");

/*

We assume buckets are already made

*/

class AmazonWeb {
 constructor() {
  this._bucket_names = {
   MODELS: config.aws.BUCKET_NAMES.MODELS.NAME,
   MODELS_PROPERTY: {
    ACCELERATED: config.aws.BUCKET_NAMES.MODELS.ACCELERATED,
   },
  };

  try {
   this._s3 = new AWS.S3({
    accessKeyId: config.aws.ACCESS_KEY_ID,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY,
   });
  } catch (err) {
   this._s3 = null;
   console.log(err);
  }
 }

 get bucket_names() {
  return this._bucket_names;
 }

 set bucket_names(bucket_names) {
  this._bucket_names = bucket_names;
 }

 async objectUpload({ bucketName, keyName, blob }) {
  let objectParams = { Bucket: bucketName, Key: keyName, Body: blob };
  const uploadPromise = await this._s3.putObject(objectParams).promise();

  if (this._bucket_names.MODELS_PROPERTY.ACCELERATED) {
   return `https://${bucketName}.s3-accelerate.amazonaws.com/${keyName}`;
  }

  return `https://${bucketName}.s3.amazonaws.com/${keyName}`;
 }

 objectDelete({ bucketName, keyName }) {
  return this._s3.deleteObject(
   { Bucket: bucketName, Key: keyName },
   (err, data) => {
    if (err) console.log(err, err.stack); // error
    else console.log("Successful");
   }
  );
 }
}

module.exports = AmazonWeb;
