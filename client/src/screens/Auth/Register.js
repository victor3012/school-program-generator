import { Link } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from "../../components/Input";
import OpacityButton from "../../components/OpacityButton";
import validators from "./validators.js";
import authStyles from "./authStyles.js";
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";

export default function Register({ updateAuthTitle, route }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [repassShown, setRepassShown] = useState(false);

    const [inputStatuses, setInputStatuses] = useState({// -1 -> not required; 0 -> neutral yet; 1 -> focused; 2 -> error
        email: 0,
        password: 0,
        repass: 0,
        firstName: 0,
        lastName: -1,
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

    const registerHandler = () => {
        try {
            validators.firstName(firstName);
            validators.lastName(lastName);
            validators.email(email);
            validators.password(password);
            validators.repass(password)(repass);

            alert('Successful registration!');
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
                    label="First Name"
                    placeholder="First Name"
                    hitSlop={10}
                    onChange={(newFirstName) => setFirstName(newFirstName)}
                    onError={() => updateInputStatus('firstName', 2)}
                    onErrorResolve={() => updateInputStatus('firstName', 1)}
                    required
                    validator={validators.firstName} />
                <Input
                    label="Last Name"
                    placeholder="Last Name"
                    hitSlop={10}
                    onChange={(newLastName) => setLastName(newLastName)}
                    onError={() => updateInputStatus('lastName', 2)}
                    onErrorResolve={() => updateInputStatus('lastName', 1)}
                    validator={validators.lastName} />

                <Input
                    label="Email"
                    placeholder="Email"
                    hitSlop={10}
                    onChange={(newEmail) => setEmail(newEmail)}
                    onError={() => updateInputStatus('email', 2)}
                    onErrorResolve={() => updateInputStatus('email', 1)}
                    required
                    validator={validators.email} />

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
                        secureTextEntry={!passwordShown} />

                    <Icon name={passwordShown ? 'eye-outline' : 'eye-off-outline'}
                        size={styleVar.mediumIconSize}
                        style={authStyles.eyeIcon}
                        hitSlop={20}
                        onPress={() => setPasswordShown(ps => !ps)} />
                </View>

                <View>
                    <Input
                        label="Repeat Password"
                        placeholder="Repeat Password"
                        hitSlop={10}
                        onChange={(newRepass) => setRepass(newRepass)}
                        onError={() => updateInputStatus('repass', 2)}
                        onErrorResolve={() => updateInputStatus('repass', 1)}
                        required
                        validator={validators.repass(password)}
                        textContentType='password'
                        passwordRules='required: lower; required: upper; required: digit; required: [-];'
                        secureTextEntry={!repassShown} />

                    <Icon name={repassShown ? 'eye-outline' : 'eye-off-outline'}
                        size={styleVar.mediumIconSize}
                        style={authStyles.eyeIcon}
                        hitSlop={20}
                        onPress={() => setRepassShown(rs => !rs)} />
                </View>

                <OpacityButton style={authStyles.button}
                    onPress={registerHandler}
                    disabled={formStatus != 1}>
                    Register
                </OpacityButton>

                <Link to={{ screen: 'Login' }} style={globalStyles.link}>
                    Already have an account? Click here to log in.
                </Link>
            </View>
        </SafeAreaView>
    )
}