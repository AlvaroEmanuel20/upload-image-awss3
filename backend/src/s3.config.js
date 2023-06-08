const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv/config');

const {
  S3_BUCKET,
  S3_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
} = process.env;

const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    sessionToken: AWS_SESSION_TOKEN,
  },
});

async function uploadToS3(file) {
  try {
    const key = `images/${Date.now()}_${file.originalname}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimeType,
      })
    );

    return { key };
  } catch (error) {
    return { error };
  }
}

async function getAllObjectsKeys() {
  const { Contents = [] } = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: 'images',
    })
  );

  return Contents.map((content) => content.Key);
}

async function getPresignedUrls() {
  try {
    const imageKeys = await getAllObjectsKeys();
    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        return getSignedUrl(
          s3Client,
          new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }),
          { expiresIn: 900 }
        );
      })
    );

    return { presignedUrls };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

module.exports = { uploadToS3, getPresignedUrls };
