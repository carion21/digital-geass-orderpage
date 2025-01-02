const Minio = require('minio');// Update the path as needed
const { MINIO_DEFAULT_DURATION } = require('./consts');
const { generateUuid } = require('./utils');

class MinioService {
    constructor() {
        this.minioProxy = process.env.MINIO_PROXY;
        this.minioHost = process.env.MINIO_HOST;
        this.minioPort = parseInt(process.env.MINIO_PORT, 10);
        this.minioSecure = process.env.MINIO_SECURE === 'true';
        this.minioAccess = process.env.MINIO_ACCESS_KEY;
        this.minioSecret = process.env.MINIO_SECRET_KEY;
        this.minioBucket = process.env.MINIO_BUCKET_NAME;
    }

    getMinioClient() {
        return new Minio.Client({
            endPoint: this.minioHost,
            port: this.minioPort,
            // endPoint: this.minioProxy,
            // port: null,
            accessKey: this.minioAccess,
            secretKey: this.minioSecret,
            useSSL: this.minioSecure,
        });
    }

    async uploadFile(file, generateObjectUrl = false) {
        const minioClient = this.getMinioClient();
        const fileExtension = file.originalname.split('.').pop();
        const objectName = generateUuid() + '.' + fileExtension;

        const metaData = {
            'Content-Type': file.mimetype,
        };

        await minioClient.putObject(this.minioBucket, objectName, file.buffer, metaData);

        let objectUrl = null;
        if (generateObjectUrl) {
            objectUrl = await minioClient.presignedGetObject(
                this.minioBucket,
                objectName,
                MINIO_DEFAULT_DURATION * 24 * 60 * 60
            );
        }

        return {
            minioBucket: this.minioBucket,
            objectName: objectName,
            objectUrl: objectUrl,
        };
    }

    // async getFileUrl(objectName) {
    //     const minioClient = this.getMinioClient();
    //     let fileUrl = await minioClient.presignedGetObject(
    //         this.minioBucket,
    //         objectName,
    //         MINIO_DEFAULT_DURATION * 24 * 60 * 60
    //     );
    //     // replace minio host and port with proxy
    //     fileUrl = fileUrl.replace(
    //         `http://${this.minioHost}:${this.minioPort}`,
    //         `https://${this.minioProxy}`
    //     );
    //     return fileUrl;
    // }

    async getFileUrl(objectName) {
        // Remplacement direct de l'URL avec le proxy
        const fileUrl = `https://${this.minioProxy}/${this.minioBucket}/${objectName}`;
        return fileUrl;
    }

    async getFile(objectName) {
        const minioClient = this.getMinioClient();
        return await minioClient.getObject(this.minioBucket, objectName);
    }

    async deleteFile(objectName) {
        const minioClient = this.getMinioClient();
        return await minioClient.removeObject(this.minioBucket, objectName);
    }
}

module.exports = MinioService;
