import * as validate from '../../services/validators';

const passwordRegExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])([\s]{0,0})[\w\d._\-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);

export default {
    password: (value) => {
        validate.required(value, 'Password is required');
        validate.minLength(value, 6);
        validate.maxLength(value, 50);
        validate.match(value, passwordRegExp, 'Must have at least 1 small letter, a capital letter, a digit and a special character');
    },
    repass: (password) => {
        return (value) => {
            validate.equal(value, password, 'Password fields don\'t match');
        }
    },
    email: validate.globalValidators.email,
    name: validate.globalValidators.name,
    securityCode: (value) => validate.required(value, 'Security code is required')
}