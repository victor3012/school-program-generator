import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { FORM_STATUS, getFormStatus } from "../services/util";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";
import OpacityButton from "./OpacityButton";
import SuccessResponse from "./SuccessResponse"

const REQUEST_STATUS = {
    UNFULLFILED: 0,
    FULFILLED: 1,
    FAILED: 2,
}

export default function ResponsiveModal({
    visible,
    setVisible,
    title,
    submitText = 'Submit',
    submitBtn = true,
    cancelText = 'Cancel',
    cancelBtn = true,
    children,
    inputStatuses,
    onSubmit,
    onFulfill,
    onError,
    onCancel,
    onReset
}) {
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.UNFULLFILED);

    useFocusEffect(
        useCallback(() => {
            const func = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                resetStates();
            }

            if (!visible) {
                func();
            }
        }, [visible])
    )

    const resetStates = useCallback(() => {
        setRequestStatus(REQUEST_STATUS.UNFULLFILED);

        if (onReset) {
            onReset();
        }
    }, [])

    const submitHandler = async () => {
        let newStatus = REQUEST_STATUS.FULFILLED;
        let result;
        let error;

        try {
            if (onSubmit) {
                result = await onSubmit();
            }
        } catch (e) {
            error = e;
            newStatus = REQUEST_STATUS.FAILED;
        }

        setRequestStatus(newStatus);
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (newStatus === REQUEST_STATUS.FULFILLED) {
            setVisible(false);

            if (onFulfill) {
                onFulfill(result);
            }
        } else {
            setRequestStatus(REQUEST_STATUS.UNFULLFILED);

            if (onError) {
                onError(error);
            }
        }
    }

    const cancelHandler = async () => {
        if (onCancel) {
            await onCancel()
        }

        setRequestStatus(REQUEST_STATUS.FAILED);
        await new Promise((resolve) => setTimeout(resolve, 200));

        setVisible(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={[globalStyles.basicContainer, { overflow: 'hidden' }]}>
                        {title &&
                            <Text style={[globalStyles.text, styles.title]}>
                                {title}
                            </Text>
                        }

                        {children}

                        <View style={styles.buttonsContainer}>
                            {submitBtn &&
                                <OpacityButton onPress={submitHandler}
                                    style={{ marginBottom: 0 }}
                                    disabled={getFormStatus(inputStatuses) != FORM_STATUS.VALID}>
                                    {submitText}
                                </OpacityButton>
                            }

                            {cancelBtn &&
                                <OpacityButton onPress={cancelHandler}
                                    style={{
                                        marginBottom: 0,
                                        backgroundColor: styleVar.white
                                    }}
                                    textStyle={{ color: styleVar.blue }}>
                                    {cancelText}
                                </OpacityButton>
                            }
                        </View>
                        {requestStatus === REQUEST_STATUS.UNFULLFILED ||
                            <SuccessResponse isSuccess={requestStatus === REQUEST_STATUS.FULFILLED} />
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1
    },
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '100%'
    },
    title: {
        fontSize: styleVar.largeFontSize,
    }
});