const mongoose = require('mongoose');
const { DATABASE } = require('../config/index');

const dbConnect = async() => {
    try {
        const con = await mongoose.connect(DATABASE)
        console.log(`Database connected to host: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;