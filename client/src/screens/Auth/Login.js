import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import Form from "../../components/Form";
import Input from "../../components/Input";
import OpacityButton from "../../components/OpacityButton";
import EyeIconButton from "../../components/Auth/EyeIconButton";
import validators from './validators.js';
import authStyles from "./authStyles.js";
import globalStyles from "../../styles/globalStyles";
import { getFormStatus } from "../../services/util";

export default function Login({ updateInputStatus }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const [inputStatuses, setInputStatuses] = useState({// -1 -> not required; 0 -> neutral yet; 1 -> focused; 2 -> error
        email: 0,
        password: 0
    });

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
        <Form inputStatuses={inputStatuses}>
            <Input
                label="Email"
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

            <OpacityButton style={authStyles.button}
                onPress={loginHandler}
                disabled={getFormStatus(inputStatuses) != 1}>
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