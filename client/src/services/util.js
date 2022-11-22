export const FORM_STATUS = {
    NOT_REQUIRED: -1,
    DEFAULT: 0,
    VALID: 1,
    INVALID: 2
}

export function getFormStatus(inputStatuses) {
    const values = Object.values(inputStatuses);

    if (values.includes(FORM_STATUS.INVALID)) {
        return FORM_STATUS.INVALID;
    }

    if (values.includes(FORM_STATUS.DEFAULT)) {
        return FORM_STATUS.DEFAULT;
    }

    return FORM_STATUS.VALID;
}

export const updateInputStatus = (inputStatuses, setInputStatuses, key, value) => {
    if (inputStatuses[key] === value) {
        return;
    }

    setInputStatuses((oldInputStatuses) => {
        let newInputStatuses = {};
        Object.assign(newInputStatuses, oldInputStatuses);
        newInputStatuses[key] = value;

        return newInputStatuses;
    })
}

export const TEACHER_ROLES = {
    TEACHER: 1,
    SYSTEM_ADMIN: 2,
    ASST_PRINCIPAL: 3,
    PRINCIPAL: 4
}

export const TEACHER_ROLES_NAMES = {
    TEACHER: 'Teacher',
    SYSTEM_ADMIN: 'System Admin',
    ASST_PRINCIPAL: 'Asst. Principal',
    PRINCIPAL: 'Principal'
}