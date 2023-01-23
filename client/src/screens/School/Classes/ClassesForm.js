import Form from "../../../components/Common/Form";
import Input from "../../../components/Common/Input";
import ResponsiveModal from "../../../components/Common/ResponsiveModal";
import modalFormStyles from "../../../styles/modalFormStyles";
import validators from "../validators";

export default function ClassesForm({
    visible,
    setVisible,
    onSubmit,
    onError,
    onReset,
    inputStatuses,
    value,
    onInputChange,
    onInputError,
    onInputErrorResolve
}) {
    return (
        <ResponsiveModal
            visible={visible} setVisible={setVisible}
            onSubmit={onSubmit}
            onError={onError}
            onReset={onReset}
            inputStatuses={inputStatuses}
            containerStyle={modalFormStyles.responsiveModal}
            isLoading={value === null}
        >
            <Form inputStatuses={inputStatuses} style={modalFormStyles.form}>
                <Input label='Class name'
                    required
                    value={value || ''}
                    validator={validators.room}
                    onChange={onInputChange}
                    onError={onInputError}
                    onErrorResolve={onInputErrorResolve}
                />
            </Form>
        </ResponsiveModal>
    )
}