const express = require('express');
const dbConnect = require('./database/index');
const { PORT, ALLOWED_ORIGIN } = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const corsOptions = {
    credentials: true,
    origin: [ALLOWED_ORIGIN]
}

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions))

app.use(express.json({limit: '5mb'}))

app.use(router)

dbConnect()

app.use('/storage', express.static('storage'))

app.use(errorHandler)
app.listen(PORT, console.log(`Backend is running on port: ${PORT}`))