import * as validate from '../../services/validators';

const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])([\s]{0,0})[\w\d._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);


export default {
    email: (value) => {
        validate.required(value, 'Email is required');
        validate.maxLength(value, 320);
        validate.match(value, emailRegExp, 'Invalid email');
    },
    password: (value) => {
        validate.required(value, 'Password is required');
        validate.minLength(value, 6);
        validate.maxLength(value, 50);
        validate.match(value, passwordRegExp, 'Must have at least 1 small letter, a capital letter, a digit and a special character');
    },
    repass: (password) => {
        return (value) => {
            validate. equal(value, password, 'Password fields don\'t match');
        }
    },
    name: (value) => {
        validate.required(value, 'Name is required');
        validate.maxLength(value, 50);
        validate.match(value, validate.stringRegExp, 'Name can only contain letters');
    }
}