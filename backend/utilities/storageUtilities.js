const cloudinary = require('cloudinary').v2;

const storageUtilities = {
    saveImage(photo, authorId) {
        // 1. Save Image to Cloud
        // 2. Return Image Path
        const publicId = `${Date.now()}-${authorId}`;
        let response;
        try {
            response = cloudinary.uploader.upload(photo,{folder: 'goblogs', public_id: publicId})
        } catch (error) {
            console.log(error)
        }
        let optimizeUrl = cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto'
        })
        return optimizeUrl;
         
    },
    updateImage(previousImage, newImage, authorId) {
        // 1. Delete Previous Image from Storage
        // 2. Save New Image to Storage
        // 3. Return New Image Path

        const publicId = `${Date.now()}-${authorId}`;
        let response;
        try {
            response = cloudinary.uploader.upload(newImage,{folder: 'goblogs', public_id: publicId})
        } catch (error) {
            console.log(error)
        }
        let optimizeUrl = cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto'
        })
        return optimizeUrl;
    }
}

module.exports = storageUtilities
