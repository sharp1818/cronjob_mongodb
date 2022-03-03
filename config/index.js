if(process.env.NODE !== "production") {
    require('dotenv').config()
}

module.exports = {
    MONGO_URI: process.env.MONGO_URI
}