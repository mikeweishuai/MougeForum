module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty"
    }

    this.validateEmailInput(errors, email)

    if (password.trim() === "") {
        errors.password = "Password must not be empty"
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password must match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateEmailInput = (errors, email) => {
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty"
    }

    if (password.trim() === "") {
        errors.password = "Password must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}