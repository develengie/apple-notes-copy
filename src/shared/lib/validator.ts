import validations from "../validations";

class Validator {
    isEmail(email: string) {
        return validations.emailRegExp.test(email);
    }

    min(password: string) {
        return password.length >= validations.minPasswordLength;
    }
}

export const validator = new Validator();
