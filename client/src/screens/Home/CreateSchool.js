import { useState } from "react";
import { StyleSheet, Text, View, Image, Modal } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import Form from "../../components/Form";
import Input from "../../components/Input";
import OpacityButton from '../../components/OpacityButton';
import PressableBox from "../../components/PressableBox";
import globalStyles from '../../styles/globalStyles';
import styleVar from '../../styles/styleVar';

import { required, maxLength } from "../../services/validators";
import { getFormStatus } from "../../services/util";


const validateSchoolName = (value) => {
    required(value, 'School name is required');
    maxLength(value);
}

export default function CreateSchool({ isAdmin }) {
    const [visible, setVisible] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [status, setStatus] = useState(0);

    const createSchoolButtonHandler = () => {
        if (!isAdmin) {
            alert("Your account has not been granted permission to create schools");
            return;
        }

        setVisible(true);
    }


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}>
                <View style={styles.modal}>
                    <Form inputStatuses={{ status }} style={{paddingTop: 20}}>
                        <Text style={[globalStyles.text, styles.title]}>
                            Create new school
                        </Text>

                        <Input label='School name'
                            required
                            validator={validateSchoolName}
                            onChange={(value) => setSchoolName(value)}
                            onError={() => setStatus(2)}
                            onErrorResolve={() => setStatus(1)} />


                        <View style={styles.buttonsContainer}>
                            <OpacityButton onPress={() => setVisible(false)}
                                style={{ marginBottom: 0 }}
                                disabled={getFormStatus({ status }) != 1}>
                                Submit
                            </OpacityButton>

                            <OpacityButton onPress={() => setVisible(false)}
                                style={{
                                    marginBottom: 0,
                                    backgroundColor: styleVar.white
                                }}
                                textStyle={{ color: styleVar.blue }}>
                                Cancel
                            </OpacityButton>
                        </View>

                    </Form>
                </View>
            </Modal >

            <PressableBox onPress={createSchoolButtonHandler}
                style={{ padding: 0 }}>
                <AntDesignIcon name="plus"
                    size={65}
                    color={isAdmin ? styleVar.blue : styleVar.gray} />
            </PressableBox>
        </View >
    );
}

const styles = StyleSheet.create({
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