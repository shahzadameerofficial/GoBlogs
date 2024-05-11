const jwt = require("jsonwebtoken");

const { ACCESS_SECRET, REFRESH_SECRET } = require('../config/index');

const RefreshToken = require('../models/token');

class JWTService {
    // METHODS

    // Sign Access Token
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_SECRET, { expiresIn: expiryTime })
    }

    // Sign Refresh Token
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_SECRET, { expiresIn: expiryTime })
    }

    // Verify Access Token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_SECRET)
    }

    // Verify Refresh Token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_SECRET)
    }

    // Store Refresh Token
    static async storeRefreshToken(token, userId){
        try {
            const newToken = new RefreshToken({
                token: payload,
                userId: userId
            })

            await newToken.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Update Refresh Token
    static async updateRefreshToken(token, userId){
        try {
            await RefreshToken.updateOne({
              _id: userId
            },
            {token},
            {upsert: true})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = JWTService