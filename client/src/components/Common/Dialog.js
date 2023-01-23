import ResponsiveModal from "./ResponsiveModal";

export default function Dialog({
    children,
    title,
    acceptText = 'OK',
    cancelText = 'Cancel',
    showSubmitBtn = true,
    showCancelBtn = true,
    visible,
    setVisible,
    onAccept,
    onFulfill,
    onCancel,
    onError,
    isLoading = false,
    ...props
}) {
    return (
        <ResponsiveModal
            title={title}
            onSubmit={onAccept}
            onFulfill={onFulfill}
            onCancel={onCancel}
            onError={onError}
            submitText={acceptText}
            cancelText={cancelText}
            visible={visible}
            setVisible={setVisible}
            showSubmitBtn={showSubmitBtn}
            showCancelBtn={showCancelBtn}
            isLoading={isLoading}
            {...props}>
            {children}
        </ResponsiveModal>
    )
}