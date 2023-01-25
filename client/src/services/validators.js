export const stringRegExp = new RegExp(/[a-zA-Z\-\s]*/);
const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const required = (value, msg = 'Field is required') => {
    if (!value || !value.trim()) {
        throw new Error(msg);
    }
}

export const match = (value, regexp, msg = 'Invalid value') => {
    value = value.trim();

    const result = value.match(regexp);

    if (!result || result[0] != value) {
        throw new Error(msg);
    }
}

export const equal = (value, valueToEqual, msg = 'Fields don\'t match') => {
    if (value.trim() != valueToEqual.trim()) {
        throw new Error(msg);
    }
}

export const inCollection = (value, collection, msg = 'Invalid value') => {
    const idx = collection.indexOf(value);

    if (idx === -1) {
        throw new Error(msg);
    }

    return idx;
}

export const minLength = (value, length = 1) => {
    if (value.trim().length < length) {
        throw new Error(`Must be at least ${length} characters long`);
    }
}

export const maxLength = (value, length = 255) => {
    if (value.trim().length > length) {
        throw new Error(`Cannot exceed length of ${length} characters`);
    }
}

export const globalValidators = {
    email: (value) => {
        required(value, 'Email is required');
        maxLength(value, 320);
        match(value, emailRegExp, 'Invalid email');
    },
    name: (value) => {
        required(value, 'Name is required');
        maxLength(value, 50);
        match(value, stringRegExp, 'Name can only contain letters');
    }
}