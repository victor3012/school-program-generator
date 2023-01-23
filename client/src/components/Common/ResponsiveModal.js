import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { FORM_STATUS, getFormStatus, REQUEST_STATUS } from "../../services/util";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";
import OpacityButton from "./OpacityButton";
import SuccessResponse from "./SuccessResponse"



export default function ResponsiveModal({
    visible,
    setVisible,
    isLoading = false,
    title,
    submitText = 'Submit',
    showSubmitBtn = true,
    cancelText = 'Cancel',
    showCancelBtn = true,
    children,
    inputStatuses = {},
    onSubmit,
    onFulfill,
    onError,
    onCancel,
    onReset,
    containerStyle
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

    useEffect(() => {
        if (isLoading) {
            setRequestStatus(REQUEST_STATUS.LOADING);
        } else {
            setRequestStatus(REQUEST_STATUS.UNFULLFILED);
        }
    }, [isLoading])

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
            setRequestStatus(REQUEST_STATUS.LOADING);
            result = await onSubmit();
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
                    <ScrollView contentContainerStyle={[styles.content]}>
                        <View style={[globalStyles.basicContainer, containerStyle]}>
                            {title &&
                                <Text style={[globalStyles.text, styles.title]}>
                                    {title}
                                </Text>
                            }

                            {children}

                            <View style={styles.buttonsContainer}>
                                {showSubmitBtn &&
                                    <OpacityButton onPress={submitHandler}
                                        style={{ marginBottom: 0 }}
                                        disabled={getFormStatus(inputStatuses) != FORM_STATUS.VALID}>
                                        {submitText}
                                    </OpacityButton>
                                }

                                {showCancelBtn &&
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
                            {(requestStatus === REQUEST_STATUS.UNFULLFILED) ||
                                <SuccessResponse requestStatus={requestStatus} />
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
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
    content: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '100%'
    },
    title: {
        fontSize: styleVar.largeFontSize,
    }
});