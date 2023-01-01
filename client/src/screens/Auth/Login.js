import { Link, useLinkTo } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useContext, useState } from "react";

import Form from "../../components/Common/Form";
import Input from "../../components/Common/Input";
import OpacityButton from "../../components/Common/OpacityButton";
import EyeIconButton from "../../components/Auth/EyeIconButton";
import validators from './validators.js';
import authStyles from "./authStyles.js";
import authStyles from "../../styles/authStyles.js";
import globalStyles from "../../styles/globalStyles";
import { getFormStatus, updateInputStatus, FORM_STATUS } from "../../services/util";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
    const linkTo = useLinkTo();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const [inputStatuses, setInputStatuses] = useState({
        email: FORM_STATUS.DEFAULT,
        password: FORM_STATUS.DEFAULT
    });

    const loginHandler = async () => {
        try {
            validators.email(email);
            validators.password(password);

            await login({ email, password });

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
                onChange={(newEmail) => setEmail(newEmail)}
                onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', FORM_STATUS.INVALID)}
                onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', FORM_STATUS.VALID)}
                required
                validator={validators.email}
                textContentType='emailAddress' />

            <View>
                <Input
                    label="Password"
                    hitSlop={10}
                    onChange={(newPassword) => setPassword(newPassword)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', FORM_STATUS.INVALID)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'password', FORM_STATUS.VALID)}
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