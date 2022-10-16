import { Link } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from "../../components/Input";
import OpacityButton from "../../components/OpacityButton";
import validators from './validators.js';
import authStyles from "./authStyles.js";
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";

export default function Login({ updateAuthTitle, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const [inputStatuses, setInputStatuses] = useState({// -1 -> not required; 0 -> neutral yet; 1 -> focused; 2 -> error
        email: 0,
        password: 0
    });
    const [formStatus, setFormStatus] = useState(0); // 0 -> neutral; 1 -> focused; 2 -> error

    useEffect(() => {
        updateAuthTitle();
    }, [route.params])

    useEffect(() => {
        setFormStatus(() => {
            const values = Object.values(inputStatuses);

            if (values.includes(2)) {
                return 2;
            }

            if (values.includes(0)) {
                return 0;
            }

            return 1;
        })
    }, [inputStatuses])

    const loginHandler = () => {
        try {
            validators.email(email);
            validators.password(password);
            alert('Successful login!');
        } catch (err) {
            alert(err);
        }
    }

    const updateInputStatus = (key, value) => {
        if (inputStatuses[key] === value) {
            return;
        }

        setInputStatuses((oldInputStatuses) => {
            let newInputStatuses = {};
            Object.assign(newInputStatuses, oldInputStatuses);
            newInputStatuses[key] = value;

            return newInputStatuses;
        })
    }

    const getContainerBorderTopColor = () => {
        if (formStatus == 2) {
            return styleVar.red;
        }

        if (formStatus == 1) {
            return styleVar.blue;
        }

        return styleVar.blueShadow;
    }

    return (
        <SafeAreaView style={authStyles.container}>
            <View style={[authStyles.formContainer, { borderTopColor: getContainerBorderTopColor() }]}>
                <Input
                    label="Email"
                    placeholder="Email"
                    hitSlop={10}
                    onChange={(newEmail) => setEmail(newEmail)}
                    onError={() => updateInputStatus('email', 2)}
                    onErrorResolve={() => updateInputStatus('email', 1)}
                    required
                    validator={validators.email}
                    textContentType='emailAddress' />

                <View>
                    <Input
                        label="Password"
                        placeholder="Password"
                        hitSlop={10}
                        onChange={(newPassword) => setPassword(newPassword)}
                        onError={() => updateInputStatus('password', 2)}
                        onErrorResolve={() => updateInputStatus('password', 1)}
                        required
                        validator={validators.password}
                        textContentType='password'
                        passwordRules='required: lower; required: upper; required: digit; required: [-];'
                        secureTextEntry={!passwordShown}
                    />
                    <Icon name={passwordShown ? 'eye-outline' : 'eye-off-outline'}
                        size={styleVar.mediumIconSize}
                        style={authStyles.eyeIcon}
                        hitSlop={20}
                        onPress={() => setPasswordShown(ps => !ps)} />
                </View>

                <OpacityButton style={authStyles.button}
                    onPress={loginHandler}
                    disabled={formStatus != 1}>
                    Login
                </OpacityButton>

                <Link to={{ screen: 'Register' }} style={globalStyles.link}>
                    Don't have an account yet? Click here to register.
                </Link>
            </View>
        </SafeAreaView>
    )
}

//eye-outline
//eye-off-outline