import { LinearGradient } from "expo-linear-gradient";
import styleVar from '../styles/styleVar';

export default function Separator({
    width = "100%",
    height = 5,
    marginVertical = 10,
    marginHorizontal = 0,
    colors = [styleVar.mainBackgroundColor, styleVar.blueShadow, styleVar.blue],
}) {
    return (
        <LinearGradient style={{ width, height, marginVertical, marginHorizontal, borderRadius: 20 }}
            colors={colors}
            start={[1, 0]}
        />
    )
}