import { Link, useLinkTo } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import useInputProps from "../../hooks/useInputProps";
import { getFormStatus, FORM_STATUS } from "../../services/util";

import Form from "../../components/Common/Form";
import Input from "../../components/Common/Input";
import OpacityButton from "../../components/Common/OpacityButton";
import EyeIconButton from "../../components/Auth/EyeIconButton";
import validators from "./validators.js";
import authStyles from "../../styles/authStyles";
import globalStyles from "../../styles/globalStyles";

export default function SignUp() {
    const linkTo = useLinkTo();

    const { register } = useContext(AuthContext);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const firstName = useInputProps('firstName', { inputStatuses, setInputStatuses });
    const lastName = useInputProps('lastName', { inputStatuses, setInputStatuses });
    const email = useInputProps('email', { inputStatuses, setInputStatuses });
    const password = useInputProps('password', { inputStatuses, setInputStatuses });
    const repass = useInputProps('repass', { inputStatuses, setInputStatuses });
    const securityCode = useInputProps('securityCode', { inputStatuses, setInputStatuses });

    const [passwordShown, setPasswordShown] = useState(false);
    const [repassShown, setRepassShown] = useState(false);


    const signUpHandler = async () => {
        try {
            validators.name(firstName.value);
            validators.name(lastName.value);
            validators.email(email.value);
            validators.password(password.value);
            validators.repass(password.value)(repass.value);
            validators.securityCode(securityCode.value);

            await register({
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            });

            linkTo('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <Form inputStatuses={inputStatuses}>
            <View style={{ width: 300, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input
                    label="First name"
                    hitSlop={10}
                    value={firstName.value}
                    onChange={firstName.onChange}
                    onError={firstName.onError}
                    onErrorResolve={firstName.onErrorResolve}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
                <Input
                    label="Last name"
                    hitSlop={10}
                    value={lastName.value}
                    onChange={lastName.onChange}
                    onError={lastName.onError}
                    onErrorResolve={lastName.onErrorResolve}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
            </View>

            <Input
                label="Email"
                hitSlop={10}
                value={email.value}
                onChange={email.onChange}
                onError={email.onError}
                onErrorResolve={email.onErrorResolve}
                required
                validator={validators.email} />

            <View>
                <Input
                    label="Password"
                    hitSlop={10}
                    value={password.value}
                    onChange={password.onChange}
                    onError={password.onError}
                    onErrorResolve={password.onErrorResolve}
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
                    value={repass.value}
                    onChange={repass.onChange}
                    onError={repass.onError}
                    onErrorResolve={repass.onErrorResolve}
                    required
                    validator={validators.repass(password)}
                    textContentType='password'
                    passwordRules='required: lower; required: upper; required: digit; required: [-];'
                    secureTextEntry={!repassShown} />

                <EyeIconButton passwordShown={repassShown} setPasswordShown={setRepassShown} />
            </View>

            <Input
                label="Security code"
                hitSlop={10}
                value={securityCode.value}
                onChange={securityCode.onChange}
                onError={securityCode.onError}
                onErrorResolve={securityCode.onErrorResolve}
                required
                validator={validators.securityCode}
            />

            <OpacityButton style={globalStyles.formButton}
                onPress={signUpHandler}
                disabled={getFormStatus(inputStatuses) != FORM_STATUS.VALID}>
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

function getDefaultInputStatuses() {
    return {
        email: FORM_STATUS.DEFAULT,
        password: FORM_STATUS.DEFAULT,
        repass: FORM_STATUS.DEFAULT,
        firstName: FORM_STATUS.DEFAULT,
        lastName: FORM_STATUS.DEFAULT,
        securityCode: FORM_STATUS.DEFAULT
    };
}