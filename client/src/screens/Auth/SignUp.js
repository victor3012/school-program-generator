import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import Form from "../../components/Form";
import Input from "../../components/Input";
import OpacityButton from "../../components/OpacityButton";
import EyeIconButton from "../../components/Auth/EyeIconButton";
import validators from "./validators.js";
import authStyles from "./authStyles.js";
import globalStyles from "../../styles/globalStyles";

export default function SignUp({
    updateInputStatus,
    getContainerBorderTopColor
}) {
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
        lastName: 0,
    });
    const [formStatus, setFormStatus] = useState(0); // 0 -> not filled in; 1 -> valid for submiting; 2 -> error

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

    const signUpHandler = () => {
        try {
            validators.name(firstName);
            validators.name(lastName);
            validators.email(email);
            validators.password(password);
            validators.repass(password)(repass);

            alert('Successful registration!');
        } catch (err) {
            alert(err);
        }
    }

    return (
        <Form borderTopColor={getContainerBorderTopColor(formStatus)}>
            <View style={{ width: 300, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input
                    label="First name"
                    hitSlop={10}
                    onChange={(newFirstName) => setFirstName(newFirstName)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'firstName', 2)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'firstName', 1)}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
                <Input
                    label="Last name"
                    hitSlop={10}
                    onChange={(newLastName) => setLastName(newLastName)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'lastName', 2)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'lastName', 1)}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
            </View>

            <Input
                label="Email"
                hitSlop={10}
                onChange={(newEmail) => setEmail(newEmail)}
                onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', 2)}
                onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', 1)}
                required
                validator={validators.email} />

            <View>
                <Input
                    label="Password"
                    hitSlop={10}
                    onChange={(newPassword) => setPassword(newPassword)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', 2)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', 1)}
                    required
                    validator={validators.password}
                    textContentType='password'
                    passwordRules='required: lower; required: upper; required: digit; required: [-];'
                    secureTextEntry={!passwordShown} />

                <EyeIconButton passwordShown={passwordShown} setPasswordShown={setPasswordShown} />
            </View>

            <View>
                <Input
                    label="Repeat password"
                    hitSlop={10}
                    onChange={(newRepass) => setRepass(newRepass)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'repass', 2)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'repass', 1)}
                    required
                    validator={validators.repass(password)}
                    textContentType='password'
                    passwordRules='required: lower; required: upper; required: digit; required: [-];'
                    secureTextEntry={!repassShown} />

                <EyeIconButton passwordShown={repassShown} setPasswordShown={setRepassShown} />
            </View>

            <OpacityButton style={authStyles.button}
                onPress={signUpHandler}
                disabled={formStatus != 1}>
                Sign up
            </OpacityButton>

            <View style={authStyles.linkContainer}>
                <Text style={globalStyles.text}>
                    Already have an account?
                </Text>
                <Link to={{ screen: 'Login' }} hitSlop={30} style={authStyles.link}>
                    Log in
                </Link>
            </View>
        </Form>
    )
}