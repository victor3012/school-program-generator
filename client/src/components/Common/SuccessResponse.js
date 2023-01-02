import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import styleVar from '../../styles/styleVar'

export default function SuccessResponse({
    isSuccess = true,
    style,
    checkStyle,
    ...props }) {
    return (
        <View
            {...props}
            style={[{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: styleVar.white,
                position: 'absolute',
                borderRadius: 20
            }, style]}>
            <Icon name={isSuccess ? 'check' : 'circle-with-cross'} size={2 * styleVar.largeIconSize} color={isSuccess ? 'green' : 'red'} style={checkStyle} />
        </View>
    )
}