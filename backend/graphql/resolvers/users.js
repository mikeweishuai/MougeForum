const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server")

const { validateRegisterInput, validateLoginInput, validateEmailInput } = require("../../Utils/validators")
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const checkAuth = require("../../Utils/check-auth");

// Generate authentication token
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            createdAt: user.createdAt
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
}


module.exports = {
    Query: {
        async countUsers() {
            const count = await User.estimatedDocumentCount()
            return count
        },
        async getUsers() {
            const users = await User.find()
            return users
        },

        async getUserByName(parent, { username }, context, info) {
            const user = await User.findOne({ username })
            return {
                ...user._doc,
                id: user.id
            }
        },

        async getUserInfo(_, { }, context) {
            // First, get basic user information (username, id) from the token
            const authUser = checkAuth(context);
            const username = authUser.username
            // Then, use the username to find other information like bio, email.
            const user = await User.findOne({ username })
            // console.log(user)
            return user;
        }
    },


    Mutation: {
        async login(parent, { username, password }, context, info) {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) { throw new UserInputError("Errors", { errors }) }
            const user = await User.findOne({ username });
            if (!user) {
                errors.general = "user not found";
                throw new UserInputError("user not found", { errors });
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = "Wrong crendetials";
                throw new UserInputError("Wrong crendetials", { errors });
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user.id,
                token
            };
        },

        async register(
            parent,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) {
            //Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) { throw new UserInputError("Errors", { errors }); }
            console.log(username);
            //Make sure user doesn't already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken",
                    {
                        errors: { username: "This username is taken" }
                    })
            }

            //hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                bio: 'Nothing yet',
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res.id,
                token
            }
        },

        async updateProfile(parent, { username, field, value }, context, info) {
            const user = await User.findOne({ username });
            // check if the username exists
            if (!user) {
                throw new UserInputError("Username not found",
                    {
                        errors: { username: "Username not found" }
                    })
            }

            // if the input field is email, validate the email
            const errors = {}
            if (field === 'email') {
                validateEmailInput(errors, value)
            }
            if (Object.keys(errors).length >= 1) {
                throw new UserInputError("Invalid email", { errors })
            }

            // check if the input field exists
            if (user[field] === undefined) {
                throw new UserInputError("Invalid field",
                    {
                        errors: { field: "Invalid field" }
                    })
            }
            // update the user
            user[field] = value
            user.save()

            return {
                ...user._doc,
                id: user.id,
            }
        }
    },




}