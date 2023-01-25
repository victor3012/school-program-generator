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
import validators from './validators.js';
import authStyles from "../../styles/authStyles.js";
import globalStyles from "../../styles/globalStyles";

export default function Login() {
    const linkTo = useLinkTo();
    const { login } = useContext(AuthContext);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const email = useInputProps('email', { inputStatuses, setInputStatuses });
    const password = useInputProps('password', { inputStatuses, setInputStatuses });

    const [passwordShown, setPasswordShown] = useState(false);

    const loginHandler = async () => {
        try {
            validators.email(email.value);
            validators.password(password.value);

            await login({
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
            <Input
                label="Email"
                hitSlop={10}
                value={email.value}
                onChange={email.onChange}
                onError={email.onError}
                onErrorResolve={email.onErrorResolve}
                required
                validator={validators.email}
                textContentType='emailAddress' />

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

            <OpacityButton style={globalStyles.formButton}
                onPress={loginHandler}
                disabled={getFormStatus(inputStatuses) != FORM_STATUS.VALID}>
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
        </Form>
    )
}

function getDefaultInputStatuses() {
    return {
        email: FORM_STATUS.DEFAULT,
        password: FORM_STATUS.DEFAULT
    }
}