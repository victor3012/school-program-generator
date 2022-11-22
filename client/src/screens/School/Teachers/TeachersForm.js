import { useContext, useState } from "react"
import { StyleSheet } from "react-native"

import Form from "../../../components/Form"
import Input from "../../../components/Input"
import ResponsiveModal from "../../../components/ResponsiveModal"
import SelectInput from "../../../components/SelectInput"
import { DataContext } from "../../../contexts/DataContext"
import { SchoolContext } from "../../../contexts/SchoolContext"
import { createTeacher } from "../../../services/schools"
import { TEACHER_ROLES, TEACHER_ROLES_NAMES } from "../../../services/util"

export default function TeachersForm({ visible, setVisible }) {
    const { school } = useContext(SchoolContext);
    const { setData: setTeachers } = useContext(DataContext);

    const [role, setRole] = useState(TEACHER_ROLES_NAMES.TEACHER);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const options = Object.keys(TEACHER_ROLES).map(role => ({ key: role, value: TEACHER_ROLES_NAMES[role] }));

    const onFirstNameChange = (value) => setFirstName(value);
    const onLastNameChange = (value) => setLastName(value);
    const onEmailChange = (value) => setEmail(value);
    const onRoleChange = (value) => setRole(value);

    const submitHandler = async () => {
        //validate


        try {
            const teacherRole = options.find(o => o.value === role).key;
            const res = await createTeacher(school.id, { firstName, lastName, email, role: teacherRole });
            setTeachers(res);
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }

    const cancelHandler = () => {
        setRole(TEACHER_ROLES_NAMES.TEACHER);
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    return (
        <ResponsiveModal
            containerStyle={{ paddingTop: 0, paddingHorizontal: 0 }}
            onSubmit={submitHandler}
            onCancel={cancelHandler}
            visible={visible}
            setVisible={setVisible}>
            <Form style={{ margin: 0, zIndex: 1, shadowOpacity: 0 }}>
                <SelectInput label='Role'
                    required
                    options={options}
                    value={role}
                    setValue={setRole}
                    onChange={onRoleChange}
                    style={styles.input}
                />
                <Input label='First name'
                    required
                    onChange={onFirstNameChange}
                    style={styles.input}
                />
                <Input label='Last name'
                    required
                    onChange={onLastNameChange}
                    style={styles.input}
                />
                <Input label='Email'
                    required
                    onChange={onEmailChange}
                    style={styles.input}
                />
            </Form>
        </ResponsiveModal>
    )
}

const styles = StyleSheet.create({
    input: {
        textAlign: 'center'
    }
})