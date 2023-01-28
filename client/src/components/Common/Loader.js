import { ActivityIndicator, Dimensions } from "react-native";
import styleVar from "../../styles/styleVar";

export default function Loader({
  size = 'large',
  color = styleVar.darkBlue,
  style }) {
  return <ActivityIndicator size={size} style={[{ height: 0.8 * Dimensions.get('window').height }, style]} color={color} />
}