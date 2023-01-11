import { TEACHER_ROLES, TEACHER_ROLES_NAMES } from '../../services/util';
import * as validate from '../../services/validators';

export default {
    email: validate.globalValidators.email,
    name: validate.globalValidators.name,
    role: (currentRole) => {
        return (value) => {
            const rolePairs = Object.entries(TEACHER_ROLES_NAMES);
            const roles = rolePairs.map(r => r[1]);

            const idx = validate.inCollection(value, roles);

            const roleValue = rolePairs[idx][0];

            if (TEACHER_ROLES[currentRole] <= TEACHER_ROLES[roleValue]) {
                throw new Error(`You do not have permission to assign this role`)
            }
        }
    },
    room: (value) => {
        validate.required(value, 'Name is required');
        validate.maxLength(value);
    },
    subjectType: (value) => {
        validate.required(value, 'Subject type is required');
    }
}