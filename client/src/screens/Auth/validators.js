const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])([\s]{0,0})[\w\d._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);
const stringRegExp = new RegExp(/[a-zA-Z\-\s]*/);

const required = (value) => {
    if (!value) {
        throw new Error('Required');
    }
}

const match = (value, regexp, msg = 'Invalid') => {
    const result = value.match(regexp);

    if (!result || result[0] != value) {
        throw new Error(msg);
    }
}

const equal = (value, valueToEqual, msg = 'Fields don\'t match') => {
    if (value != valueToEqual) {
        throw new Error(msg);
    }
}

const minLength = (value, length) => {
    if (value.length < length) {
        throw new Error(`Must be at least ${length} characters long`);
    }
}

const maxLength = (value, length) => {
    if (value.length > length) {
        throw new Error(`Cannot exceed length of ${length} characters`);
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
        match(value, passwordRegExp, 'Must have at least 1 small letter, capital letter, a digit and a special character');
    },
    repass: (password) => {
        return (value) => {
            equal(value, password, 'Doesn\'t match password');
        }
    },
    name: (value) => {
        required(value);
        maxLength(value, 50);
        match(value, stringRegExp, 'Can only contain letters');
    }
}