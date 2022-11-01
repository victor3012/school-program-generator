import { useLinkTo } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Animated, Platform } from "react-native";
import OpacityButton from "../../components/OpacityButton";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

export default function WelcomePage() {
    const dimensions = useWindowDimensions();
    const linkTo = useLinkTo();

    const size = (dimensions.width > dimensions.height
        ? dimensions.width
        : dimensions.height) / 2;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={[globalStyles.text, styles.heading]}>
                    Welcome to PMZ
                </Text>
                <Text style={[globalStyles.text, styles.subtitle]}>
                    Create an account and explore the benefits of using our application
                </Text>
                <View style={styles.buttonsContainer}>
                    <OpacityButton onPress={() => linkTo('/login')}>
                        Log in
                    </OpacityButton>
                    <Text style={[globalStyles.text, { marginHorizontal: 20 }]}>
                        or
                    </Text>
                    <OpacityButton onPress={() => linkTo('/signup')}>
                        Sign up
                    </OpacityButton>
                </View>
            </View>

            <AnimatedBall appearFrom='left'
                size={size}
                left={-0.25 * size}
                top={dimensions.height - 0.65 * size}
                dimensions={dimensions} />

            {
                Platform.OS === 'web'
                    ? <AnimatedBall appearFrom='bottom'
                        size={size}
                        left={(dimensions.width - size) / 2}
                        top={dimensions.height - 0.5 * size}
                        dimensions={dimensions} />
                    : <AnimatedBall appearFrom='bottom'
                        size={0.4 * size}
                        left={(dimensions.width - 0.4 * size) / 2}
                        top={dimensions.height - 1.2 * size}
                        dimensions={dimensions} />
            }

            <AnimatedBall appearFrom='right'
                size={size}
                left={dimensions.width - 0.7 * size}
                top={dimensions.height - 0.75 * size}
                dimensions={dimensions} />

        </SafeAreaView >
    )
}

function AnimatedBall({ left, top, size, dimensions, appearFrom }) {
    const [pos, setPos] = useState(null);

    useEffect(() => {
        setPos(() => {
            let x = left;
            let y = top;

            if (appearFrom === 'top') {
                y = -2 * size;
            } else if (appearFrom === 'bottom') {
                y = dimensions.height + 2 * size;
            } else if (appearFrom === 'left') {
                x = -2 * size;
            } else if (appearFrom === 'right') {
                x = dimensions.width + 2 * size;
            }

            return { x, y };
        });
    }, [dimensions])

    return (
        pos &&
        <Ball size={size} left={left} top={top} startingPos={pos} dimensions={dimensions} />
    )
}

function Ball({ size, left, top, startingPos, dimensions }) {
    const pos = useRef(new Animated.ValueXY(startingPos || { x: left, y: top })).current;

    useEffect(() => {
        Animated.spring(pos, { toValue: { x: left, y: top }, speed: 2, useNativeDriver: false }).start();
    }, [dimensions])


    return (
        <Animated.View style={[styles.ball, {
            left: pos.x,
            top: pos.y,
            width: size,
            height: size,
            borderRadius: size / 2
        }]} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden",
    },
    welcomeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        padding: 30
    },
    subtitle: {
        marginVertical: 20,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontSize: 1.5 * styleVar.largeFontSize
    },
    ball: {
        backgroundColor: 'rgba(30, 144, 255, 0.8)',
        position: 'absolute',
        overflow: "hidden"
    }
})