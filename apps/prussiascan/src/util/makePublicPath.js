module.exports.makePublicPath = (fileKey) => {
    if (!fileKey) {
        return '';
    }

    return `${process.env.AWS_S3_URL}/${process.env.AWS_OBJECT_PHOTOS_BUCKET_NAME}/${fileKey}`;
};
