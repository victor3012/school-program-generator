import { ActivityIndicator, Dimensions } from "react-native";
import styleVar from "../styles/styleVar";

export default function Loader() {
    return <ActivityIndicator size='large' style={{ height: 0.8 * Dimensions.get('window').height }} color={styleVar.darkBlue} />
  }