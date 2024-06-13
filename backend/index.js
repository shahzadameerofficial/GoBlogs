const express = require('express');
const dbConnect = require('./database/index');
const { PORT, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const corsOptions = {
    credentials: true,
    origin: 'https://go-blogs.vercel.app/',
    'Access-Control-Allow-Origin': 'https://go-blogs.vercel.app/'
}
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_KEY, 
    api_secret: CLOUDINARY_SECRET
});

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions))

app.use(express.json({limit: '5mb'}))

app.use(router)

dbConnect()

app.use('/storage', express.static('storage'))

app.use(errorHandler)
app.listen(PORT, console.log(`Backend is running on port: ${PORT}`))
