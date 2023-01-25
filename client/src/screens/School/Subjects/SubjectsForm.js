import Form from "../../../components/Common/Form";
import Input from "../../../components/Common/Input";
import SelectInput from "../../../components/Common/SelectInput";
import SelectNewOptionInput from "../../../components/Common/SelectNewOptionInput";
import ResponsiveModal from "../../../components/Common/ResponsiveModal";
import modalFormStyles from "../../../styles/modalFormStyles";
import validators from "../validators";

export default function SubjectsForm({
    visible,
    setVisible,
    onSubmit,
    onError,
    onReset,
    inputStatuses,
    subjectName,
    subjectType,
    subjectTypeOptions,
    roomType,
    roomTypeOptions
}) {
    return (
        <ResponsiveModal
            visible={visible} setVisible={setVisible}
            onSubmit={onSubmit}
            onError={onError}
            onReset={onReset}
            inputStatuses={inputStatuses}
            containerStyle={modalFormStyles.responsiveModal}>
            <Form inputStatuses={inputStatuses} style={modalFormStyles.form}>
                <Input label='Subject name'
                    required
                    value={subjectName.value}
                    validator={validators.room}
                    onChange={subjectName.onChange}
                    onError={subjectName.onError}
                    onErrorResolve={subjectName.onErrorResolve}
                />

                <SelectNewOptionInput label='Subject type'
                    relativeDropdown={true}
                    required
                    value={subjectType.value}
                    validator={validators.subjectType}
                    setValue={subjectType.setValue}
                    onChange={subjectType.onChange}
                    onError={subjectType.onError}
                    onErrorResolve={subjectType.onErrorResolve}
                    options={subjectTypeOptions}
                />

                <SelectInput label='Room type'
                    relativeDropdown={true}
                    required
                    value={roomType.value}
                    validator={validators.roomType}
                    setValue={roomType.setValue}
                    onChange={roomType.onChange}
                    onError={roomType.onError}
                    onErrorResolve={roomType.onErrorResolve}
                    options={roomTypeOptions}
                />
            </Form>
        </ResponsiveModal>
    )
}