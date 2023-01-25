import Form from "../../../components/Common/Form";
import Input from "../../../components/Common/Input";
import SelectNewOptionInput from "../../../components/Common/SelectNewOptionInput";
import ResponsiveModal from "../../../components/Common/ResponsiveModal";
import modalFormStyles from "../../../styles/modalFormStyles";
import validators from "../validators";

export default function RoomsForm({
    visible,
    setVisible,
    onSubmit,
    onError,
    onReset,
    inputStatuses,
    roomName,
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
                <Input label='Room name'
                    required
                    value={roomName.value}
                    validator={validators.room}
                    onChange={roomName.onChange}
                    onError={roomName.onError}
                    onErrorResolve={roomName.onErrorResolve}
                />

                <SelectNewOptionInput label='Room type'
                    required
                    relativeDropdown={true}
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