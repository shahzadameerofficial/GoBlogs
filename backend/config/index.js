const dotenv = require('dotenv').config();

const { PORT, DATABASE, ACCESS_SECRET, REFRESH_SECRET, BACKEND_SERVER_PATH, ALLOWED_ORIGIN, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;


module.exports = {PORT, DATABASE, ACCESS_SECRET, REFRESH_SECRET, BACKEND_SERVER_PATH, ALLOWED_ORIGIN, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET}
