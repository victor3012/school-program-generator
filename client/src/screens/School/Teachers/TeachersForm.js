import { useContext, useState } from "react"
import { StyleSheet } from "react-native"

import Form from "../../../components/Common/Form"
import Input from "../../../components/Common/Input"
import ResponsiveModal from "../../../components/Common/ResponsiveModal"
import SelectInput from "../../../components/Common/SelectInput"
import { DataContext } from "../../../contexts/DataContext"
import { SchoolContext } from "../../../contexts/SchoolContext"
import { createTeacher } from "../../../services/schools"
import { FORM_STATUS, TEACHER_ROLES, TEACHER_ROLES_NAMES, updateInputStatus } from "../../../services/util"
import modalFormStyles from "../../../styles/modalFormStyles"
import validators from "../validators"

export default function TeachersForm({ visible, setVisible }) {
    const { school, teacher } = useContext(SchoolContext);
    const { setData: setTeachers } = useContext(DataContext);

    const [role, setRole] = useState(TEACHER_ROLES_NAMES.TEACHER);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const options = Object.keys(TEACHER_ROLES).map(role => ({ key: role, value: TEACHER_ROLES_NAMES[role] }));

    const submitHandler = async () => {
        try {
            validators.role(teacher.role)(role);
            validators.name(firstName);
            validators.name(lastName);
            validators.email(email);

            const teacherRole = options.find(o => o.value === role).key;
            const res = await createTeacher(school.id, { firstName, lastName, email, role: teacherRole });
            setTeachers(res);
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }

    const resetHandler = () => {
        setInputStatuses(getDefaultInputStatuses());
        setRole(TEACHER_ROLES_NAMES.TEACHER);
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    const setInputValid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.VALID);
    const setInputInvalid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.INVALID);

    const onRoleChange = (value) => setRole(value);
    const onFirstNameChange = (value) => setFirstName(value);
    const onLastNameChange = (value) => setLastName(value);
    const onEmailChange = (value) => setEmail(value);

    const onRoleError = () => setInputInvalid('role');
    const onFirstNameError = () => setInputInvalid('firstName');
    const onLastNameError = () => setInputInvalid('lastName');
    const onEmailError = () => setInputInvalid('email');

    const onRoleErrorResolve = () => setInputValid('role');
    const onFirstNameErrorResolve = () => setInputValid('firstName');
    const onLastNameErrorResolve = () => setInputValid('lastName');
    const onEmailErrorResolve = () => setInputValid('email');

    return (
        <ResponsiveModal
            containerStyle={modalFormStyles.responsiveModal}
            inputStatuses={inputStatuses}
            onSubmit={submitHandler}
            onReset={resetHandler}
            visible={visible}
            setVisible={setVisible}>
            <Form style={modalFormStyles.form} inputStatuses={inputStatuses}>
                <SelectInput label='Role'
                    required
                    validator={validators.role(teacher.role)}
                    options={options}
                    value={role}
                    setValue={setRole}
                    onChange={onRoleChange}
                    onError={onRoleError}
                    onErrorResolve={onRoleErrorResolve}
                    style={modalFormStyles.input}
                />
                <Input label='First name'
                    required
                    value={firstName}
                    validator={validators.name}
                    onChange={onFirstNameChange}
                    onError={onFirstNameError}
                    onErrorResolve={onFirstNameErrorResolve}
                    style={modalFormStyles.input}
                />
                <Input label='Last name'
                    required
                    value={lastName}
                    validator={validators.name}
                    onChange={onLastNameChange}
                    onError={onLastNameError}
                    onErrorResolve={onLastNameErrorResolve}
                    style={modalFormStyles.input}
                />
                <Input label='Email'
                    required
                    value={email}
                    validator={validators.email}
                    onChange={onEmailChange}
                    onError={onEmailError}
                    onErrorResolve={onEmailErrorResolve}
                    style={modalFormStyles.input}
                />
            </Form>
        </ResponsiveModal>
    )
}

function getDefaultInputStatuses() {
    return {
        role: FORM_STATUS.DEFAULT,
        firstName: FORM_STATUS.DEFAULT,
        lastName: FORM_STATUS.DEFAULT,
        email: FORM_STATUS.DEFAULT
    }
}