const Joi = require("joi");
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/userDto");
const JWTService = require('../services/JWTService');

const Blog = require('../models/blog');
const RefreshToken = require('../models/token')

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/
const authController = {
    async register(req, res, next) {
        // STEPS
        // Step 1 - Validating Input
        // Step 2 - Match With Existing records
        // Step 3 - Password Hashing
        // Step 4 - Storing User
        // Step 5 - Handling Tokens
        // Step 6 - Response

        // 1. Validating Input - Validate User Input and matching it with schema Models

        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        })

        const { error } = userRegisterSchema.validate(req.body);

        // If validation errors found then return via error Middleware
        if (error) {
            return next(error)
        }

        // 2. Match With Existing records - Check Email In Existing Users,
        const { email, password, username, name } = req.body
        try {
            const emailInUse = await User.exists({ email });

            // If email or username already exists return an Error
            if (emailInUse) {
                const error = {
                    status: 409,
                    message: 'This email is already registered, Try another email'
                }

                return next(error)
            }
        } catch (error) {
            return next(error)
        }

        // 3. Password Hashing - If Previous Tests passes than Start Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // 4. Storing User - Store User data in database with hashed password
        let user;
        try {
            const userToRegister = new User({
                username,
                email,
                name,
                password: hashedPassword
            })

            user = await userToRegister.save();

        } catch (error) {
            return next(error)
        }

        // 5. Handling Tokens - Siging and Storing Access & Refresh Tokens

        const accessToken = JWTService.signAccessToken({ _id: user._id }, '30m');
        const refreshToken = JWTService.signRefreshToken({ _id: user._id }, '60m');

        // Storing Tokens in DB
        await JWTService.storeRefreshToken(refreshToken, user._id)

        // Setting Tokens to Cookies
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        res.cookie('refreshToken ', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        // 6. Response - Send response to the user after successful registration.

        const userDto = new UserDTO(user)
        return res.status(201).json({ user: userDto, auth: true })
    },
    async login(req, res, next) {
        // STEPS
        // Step 1 - Validating Input
        // Step 2 - Matching Email and Password
        // Step 3 - Response

        // 1. Validating Input - Matching User Input with defined schema
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required()
        });

        const { error } = userLoginSchema.validate(req.body)

        // If a Validation Error Occurs. Call Error Handler Middleware
        if (error) {
            return next(error)
        }

        // 2. Matching Credentials with existing users records

        // extracting email and password from request body
        const { email, password } = req.body;
        let user;
        try {

            // matching email
            user = await User.findOne({ email });

            // if record not found
            if (!user) {
                const error = {
                    status: 401,
                    message: 'Invalid Email - No user record found with this email.'
                }

                return next(error)
            }

            // if user record found then check the password

            // match the provided password with hashed password
            const match = await bcrypt.compare(password, user.password);

            // if Password not matched
            if (!match) {
                const error = {
                    status: 401,
                    message: 'Invalid Password - The password is incorrect!'
                }

                return next(error)
            }
        } catch (error) {
            return next(error)
        }

        // 3. Handling Tokens - Siging and Storing Access & Refresh Tokens

        const accessToken = JWTService.signAccessToken({ _id: user._id }, '30m');
        const refreshToken = JWTService.signRefreshToken({ _id: user._id }, '60m');

        // Storing Tokens in DB
        await JWTService.updateRefreshToken(refreshToken, user._id)

        // Setting Tokens to Cookies
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        res.cookie('refreshToken ', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        })

        // 4. Response
        const userDto = new UserDTO(user)
        return res.status(200).json({ user: userDto, auth: true })
    },
    async logout(req, res, next) {
        // STEPS
        // Step 1 - Delete Refresh Token from DB
        // Step 2 - Response

        const { refreshToken } = req.cookies

        try {
            await RefreshToken.deleteOne({ token: refreshToken })
        } catch (error) {
            return next(error)
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(200).json({ user: null, auth: false })
    },
    async refresh(req, res, next) {
        // STEPS
        // Get Refresh Token from cookies
        // verify refresh tokens
        // generate new tokens
        // update database with new tokens
        // return response

        const originalRefreshToken = req.cookies.refreshToken
        let id;
        try {
            id = await JWTService.verifyRefreshToken(originalRefreshToken)._id
        } catch (e) {
            const error = {
                status: 401,
                message: 'Unauthorized'
            }
            return next(error)
        }
        try {
            const match = await RefreshToken.findOne({ _id: id, token: originalRefreshToken });
            if (!match) {
                const error = {
                    status: 401,
                    message: 'Unauthorized'
                }
                return next(error)
            }
        } catch (error) {
            return next(error)
        }

        try {
            const accessToken = JWTService.signAccessToken({ _id: id }, '30m');
            const refreshToken = JWTService.signRefreshToken({ _id: id }, '60m');

            await RefreshToken.updateOne({ _id: id }, { token: refreshToken })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24, httpOnly: true,
                sameSite: "None",
                secure: true
            })
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24, httpOnly: true,
                sameSite: "None",
                secure: true
            })
        } catch (error) {
            return next(error)
        }

        const user = await User.findOne({ _id: id });

        const userDto = new UserDTO(user)
        return res.status(200).json({ user: userDto, auth: true })
    },
    async deleteAccount(req, res, next) {
        const originalRefreshToken = req.cookies.refreshToken;
        const { userId } = req.params
        let id;
        try {
            id = await JWTService.verifyRefreshToken(originalRefreshToken)._id
            const match = await RefreshToken.findOne({ _id: id, token: originalRefreshToken });
            if (!match || id != userId) {
                const error = {
                    status: 401,
                    message: 'Unauthorized'
                }
                return next(error)
            }

            // Deleting Refresh Token
            await RefreshToken.deleteOne({ token: originalRefreshToken })
        } catch (e) {
            const error = {
                status: 401,
                message: 'Unauthorized'
            }
            return next(error)
        }

        // Delete User and Its Blogs
        try {
            await User.deleteOne({ _id: userId });
            await Blog.deleteMany({ author: userId })
        } catch (error) {
            return next(error)
        }
        const user = {
            _id: null,
            name: null,
            email: null
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ user, auth: false })
    },
}

module.exports = authController