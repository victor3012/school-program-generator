import { Link } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from "../../components/Input";
import OpacityButton from "../../components/OpacityButton";
import validators from './validators.js';
import authStyles from "./authStyles.js";
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";

export default function Login({
    route,
    updateAuthTitle,
    updateInputStatus,
    getContainerBorderTopColor
}) {
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

    return (
        <SafeAreaView style={authStyles.container}>
            <View style={[authStyles.formContainer, { borderTopColor: getContainerBorderTopColor(formStatus) }]}>
                <Input
                    label="Email"
                    placeholder="Email"
                    hitSlop={10}
                    onChange={(newEmail) => setEmail(newEmail)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', 2)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', 1)}
                    required
                    validator={validators.email}
                    textContentType='emailAddress' />

                <View>
                    <Input
                        label="Password"
                        placeholder="Password"
                        hitSlop={10}
                        onChange={(newPassword) => setPassword(newPassword)}
                        onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', 2)}
                        onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', 1)}
                        required
                        validator={validators.password}
                        textContentType='password'
                        passwordRules='required: lower; required: upper; required: digit; required: [-];'
                        secureTextEntry={!passwordShown}
                    />
                    <Icon name={passwordShown ? 'eye-outline' : 'eye-off-outline'}
                        size={styleVar.mediumIconSize}
                        style={authStyles.eyeIcon}
                        hitSlop={30}
                        onPress={() => setPasswordShown(ps => !ps)} />
                </View>

                <OpacityButton style={authStyles.button}
                    onPress={loginHandler}
                    disabled={formStatus != 1}>
                    Log in
                </OpacityButton>

                <View style={authStyles.linkContainer}>
                    <Text style={globalStyles.text}>
                        Don't have an account yet?
                    </Text>
                    <Link to={{ screen: 'SignUp' }} hitSlop={30} style={authStyles.link}>
                        Sign up
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}