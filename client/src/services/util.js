export function getFormStatus(inputStatuses) {
    const values = Object.values(inputStatuses);

    if (values.includes(2)) {
        return 2;
    }

    if (values.includes(0)) {
        return 0;
    }

    return 1;
}