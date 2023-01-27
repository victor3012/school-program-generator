import { useContext } from "react"

import Form from "../../../components/Common/Form"
import Input from "../../../components/Common/Input"
import ResponsiveModal from "../../../components/Common/ResponsiveModal"
import SelectInput from "../../../components/Common/SelectInput"
import { SchoolContext } from "../../../contexts/SchoolContext"
import modalFormStyles from "../../../styles/modalFormStyles"
import validators from "../validators"

export default function TeachersForm({
    visible,
    setVisible,
    onSubmit,
    onError,
    onReset,
    inputStatuses,
    role,
    firstName,
    lastName,
    email,
    roleOptions
}) {
    const { teacher } = useContext(SchoolContext);

    return (
        <ResponsiveModal
            containerStyle={modalFormStyles.responsiveModal}
            inputStatuses={inputStatuses}
            onSubmit={onSubmit}
            onError={onError}
            onReset={onReset}
            visible={visible}
            setVisible={setVisible}>
            <Form style={modalFormStyles.form} inputStatuses={inputStatuses}>
                <SelectInput label='Role'
                    required
                    validator={validators.role(teacher.role)}
                    options={roleOptions}
                    value={role.value}
                    setValue={role.setValue}
                    onChange={role.onChange}
                    onError={role.onError}
                    onErrorResolve={role.onErrorResolve}
                />
                <Input label='First name'
                    required
                    value={firstName.value}
                    validator={validators.name}
                    onChange={firstName.onChange}
                    onError={firstName.onError}
                    onErrorResolve={firstName.onErrorResolve}
                />
                <Input label='Last name'
                    required
                    value={lastName.value}
                    validator={validators.name}
                    onChange={lastName.onChange}
                    onError={lastName.onError}
                    onErrorResolve={lastName.onErrorResolve}
                />
                <Input label='Email'
                    required
                    value={email.value}
                    validator={validators.email}
                    onChange={email.onChange}
                    onError={email.onError}
                    onErrorResolve={email.onErrorResolve}
                />
            </Form>
        </ResponsiveModal>
    )
}