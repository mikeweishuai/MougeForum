const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

// Get the authentication token by the current header. Then
// decode the token to get the user object.

module.exports = (context) => {
    // Get authorization token from the header
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Check if the token is in the correct format
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            // Validate the token by json web token
            try {
                // Decode the token
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
};