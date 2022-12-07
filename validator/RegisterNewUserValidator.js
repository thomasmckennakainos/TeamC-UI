module.exports.validateNewUser = function (newUser) {

    const passwordMin = 8;
    const passwordMax = 16;

    specialCharCheck = /[@%$£!?]/.test(newUser.password);

    function containsUppercase(string) {
        return /[A-Z]/.test(string);
    }

    function containsLowerCase(password) {
        return password.toUpperCase() != password;
    }

    function containsWhitespace(string) {
        return /\s/.test(string);
    }

    if (newUser.email == null || newUser.password == null || newUser.role == undefined) {
        return "Fields must not be empty!";
    }

    if (!newUser.email.includes('@') || containsWhitespace(newUser.email) == true) {
        return "Email must be in correct format (example@example.com)";
    }

    if (newUser.password.length < passwordMin || newUser.password.length > passwordMax) {
        return "Sorry, password must be between 8 & 16 characters!";
    }

    if (specialCharCheck === false) {
        return "Sorry, password must contain at least one special character (@, %, $, £, !, ?)";
    }

    if (containsUppercase(newUser.password) === false) {
        return "Sorry, password must contain at least one uppercase letter";
    }

    if (containsLowerCase(newUser.password) === false) {
        return "Sorry, password must contain at least one lowercase letter";
    }

    return null;
}