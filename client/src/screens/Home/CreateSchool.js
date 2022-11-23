import { useContext, useState } from "react";
import { View } from 'react-native';
import { useLinkTo } from "@react-navigation/native";

import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import { AuthContext } from "../../contexts/AuthContext";
import Input from "../../components/Common/Input";
import PressableBox from "../../components/Common/PressableBox";
import ResponsiveModal from "../../components/Common/ResponsiveModal";

import { required, maxLength } from "../../services/validators";
import { FORM_STATUS } from "../../services/util";
import { createSchool } from "../../services/schools";

import styleVar from '../../styles/styleVar';

const ACCESS_ERROR_MSG = "Your account has not been granted permission to create schools";

const validateSchoolName = (value) => {
    required(value, 'School name is required');
    maxLength(value);
}

export default function CreateSchool() {
    const { user } = useContext(AuthContext);

    const linkTo = useLinkTo();

    const [visible, setVisible] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [status, setStatus] = useState(0);

    const openCreateButtonHandler = () => {
        if (!user.admin) {
            alert(ACCESS_ERROR_MSG);
            return;
        }

        setVisible(true);
    }

    const submitHandler = async () => {
        if (!user.admin) {
            throw new Error(ACCESS_ERROR_MSG);
        }

        const newSN = schoolName.trim();
        setSchoolName(newSN);

        validateSchoolName(newSN);

        const school = await createSchool(newSN);

        return school.id;
    }

    const successHandler = (schoolId) => {
        linkTo(`/schools/${schoolId}`);
    }

    const errorHandler = (error) => {
        alert(error.message);
    }

    const resetHandler = () => {
        setSchoolName('');
    }

    return (
        <View>
            <ResponsiveModal title='Create new school'
                visible={visible} setVisible={setVisible}
                onSubmit={submitHandler}
                onFulfill={successHandler}
                onError={errorHandler}
                onReset={resetHandler}
                inputStatuses={{ status }}
            >
                <Input label='School name'
                    showError={false}
                    required
                    value={schoolName}
                    validator={validateSchoolName}
                    onChange={(value) => setSchoolName(value)}
                    onError={() => setStatus(FORM_STATUS.INVALID)}
                    onErrorResolve={() => setStatus(FORM_STATUS.VALID)}
                />
            </ResponsiveModal>

            <PressableBox onPress={openCreateButtonHandler}
                style={{ padding: 0 }}>
                <AntDesignIcon name="plus"
                    size={65}
                    color={user.admin ? styleVar.blue : styleVar.gray} />
            </PressableBox>
        </View >
    );
}