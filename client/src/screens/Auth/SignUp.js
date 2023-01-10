import { Link, useLinkTo } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { getFormStatus, updateInputStatus, FORM_STATUS } from "../../services/util";

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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const [repassShown, setRepassShown] = useState(false);

    const [inputStatuses, setInputStatuses] = useState({// -1 -> not required; 0 -> neutral yet; 1 -> focused; 2 -> error
        email: FORM_STATUS.DEFAULT,
        password: FORM_STATUS.DEFAULT,
        repass: FORM_STATUS.DEFAULT,
        firstName: FORM_STATUS.DEFAULT,
        lastName: FORM_STATUS.DEFAULT,
    });

    const signUpHandler = async () => {
        try {
            validators.name(firstName);
            validators.name(lastName);
            validators.email(email);
            validators.password(password);
            validators.repass(password)(repass);
            validators.securityCode(securityCode);

            await register({ firstName, lastName, email, password });

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
                    value={firstName}
                    onChange={(newFirstName) => setFirstName(newFirstName)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'firstName', FORM_STATUS.INVALID)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'firstName', FORM_STATUS.VALID)}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
                <Input
                    label="Last name"
                    hitSlop={10}
                    value={lastName}
                    onChange={(newLastName) => setLastName(newLastName)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'lastName', FORM_STATUS.INVALID)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'lastName', FORM_STATUS.VALID)}
                    required
                    validator={validators.name}
                    style={{ width: 142 }}
                    containerStyle={{ width: 142 }} />
            </View>

            <Input
                label="Email"
                hitSlop={10}
                value={email}
                onChange={(newEmail) => setEmail(newEmail)}
                onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', FORM_STATUS.INVALID)}
                onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'email', FORM_STATUS.VALID)}
                required
                validator={validators.email} />

            <View>
                <Input
                    label="Password"
                    hitSlop={10}
                    value={password}
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

            <View>
                <Input
                    label="Repeat password"
                    hitSlop={10}
                    value={repass}
                    onChange={(newRepass) => setRepass(newRepass)}
                    onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'repass', FORM_STATUS.INVALID)}
                    onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'repass', FORM_STATUS.VALID)}
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
                value={securityCode}
                onChange={(newSecurityCode) => setSecurityCode(newSecurityCode)}
                onError={() => updateInputStatus(inputStatuses, setInputStatuses, 'securityCode', FORM_STATUS.INVALID)}
                onErrorResolve={() => updateInputStatus(inputStatuses, setInputStatuses, 'securityCode', FORM_STATUS.VALID)}
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