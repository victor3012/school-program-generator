import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styleVar from '../../styles/styleVar'

export default function SecurityCodeIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='account-lock' color={color} size={size} {...props} />
    )
}