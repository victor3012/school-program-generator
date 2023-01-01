import { LinearGradient } from "expo-linear-gradient";
import styleVar from '../../styles/styleVar';

export default function Separator({
    width = "100%",
    height = 5,
    marginVertical = 10,
    marginHorizontal = 0,
    colors = [styleVar.blue, styleVar.blueShadow, styleVar.mainBackgroundColor],
}) {
    return (
        <LinearGradient style={{ width, height, marginVertical, marginHorizontal, borderRadius: 20 }}
            colors={colors}
            start={[0, 1]}
        />
    )
}