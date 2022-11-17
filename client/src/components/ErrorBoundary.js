import React from "react";
import { Link } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(errorInfo);
        alert(error.message);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={[globalStyles.text, { fontSize: styleVar.largeFontSize }]}>Oops! Something went wrong...</Text>
                    <Link to='/' style={[globalStyles.link, { fontSize: styleVar.largeFontSize }]}>Click here to return to Home page</Link>
                </View>
            )
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})