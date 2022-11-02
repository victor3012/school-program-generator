export const stringRegExp = new RegExp(/[a-zA-Z\-\s]*/);

export const required = (value, msg = 'Required') => {
    if (!value) {
        throw new Error(msg);
    }
}

export const match = (value, regexp, msg = 'Invalid') => {
    const result = value.match(regexp);

    if (!result || result[0] != value) {
        throw new Error(msg);
    }
}

export const equal = (value, valueToEqual, msg = 'Fields don\'t match') => {
    if (value != valueToEqual) {
        throw new Error(msg);
    }
}

export const minLength = (value, length = 1) => {
    if (value.length < length) {
        throw new Error(`Must be at least ${length} characters long`);
    }
}

export const maxLength = (value, length = 255) => {
    if (value.length > length) {
        throw new Error(`Cannot exceed length of ${length} characters`);
    }
}