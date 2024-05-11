const { BACKEND_SERVER_PATH } = require('../config/index');
const fs = require('fs');

const storageUtilities = {
    saveImage(photo, authorId) {
        // 1. Save Image to Storage
        // 2. Return Image Path

        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

        const fileName = `${Date.now()}-${authorId}`;
        try {
            fs.writeFileSync(`storage/${fileName}`, buffer) // Storing Image
        } catch (error) {
            return error
        }
        const imagePath = `${BACKEND_SERVER_PATH}/storage/${fileName}`
        return imagePath
    },
    updateImage(previousImage, newImage, authorId) {
        // 1. Delete Previous Image from Storage
        // 2. Save New Image to Storage
        // 3. Return New Image Path

        let previousPhoto = previousImage;
        previousPhoto = previousPhoto.split('/').at(-1);

        fs.unlinkSync(`storage/${previousPhoto}`); // Delete Previous Image from Storage

        const buffer = Buffer.from(newImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

        const fileName = `${Date.now()}-${authorId}`;

        try {
            fs.writeFileSync(`storage/${fileName}`, buffer) // Storing Image
        } catch (error) {
            return error
        }

        const imagePath = `${BACKEND_SERVER_PATH}/storage/${fileName}`
        return imagePath
    }
}

module.exports = storageUtilities