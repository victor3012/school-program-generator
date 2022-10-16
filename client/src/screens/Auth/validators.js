const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])([\s]{0,0})[\w\d._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);
const stringRegExp = new RegExp(/[a-zA-Z]*/);

const required = (value) => {
    if (!value) {
        throw new Error('required');
    }
}

const match = (value, regexp, msg = 'invalid') => {
    const result = value.match(regexp);

    if (!result || result[0] != value) {
        throw new Error(msg);
    }
}

const equal = (value, valueToEqual, msg = 'fields don\'t match') => {
    if (value != valueToEqual) {
        throw new Error(msg);
    }
}

const minLength = (value, length) => {
    if (value.length < length) {
        throw new Error(`must be at least ${length} characters long`);
    }
}

const maxLength = (value, length) => {
    if (value.length > length) {
        throw new Error(`cannot exceed length of ${length} characters`);
    }
}

export default {
    email: (value) => {
        required(value);
        maxLength(value, 320);
        match(value, emailRegExp);
    },
    password: (value) => {
        required(value);
        minLength(value, 6);
        maxLength(value, 50);
        match(value, passwordRegExp, 'must have at least 1 small letter, capital letter, a digit and a special character');
    },
    repass: (password) => {
        return (value) => {
            equal(value, password, 'doesn\'t match password');
        }
    },
    firstName: (value) => {
        required(value);
        maxLength(value, 50);
        match(value, stringRegExp, 'can only contain letters');
    },
    lastName: (value) => {
        maxLength(value, 50);
        if (value) {
            match(value, stringRegExp, 'can only contain letters');
        }
    }
}