import Icon from 'react-native-vector-icons/AntDesign'
import styleVar from '../../styles/styleVar'

export default function BackIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='back' color={color} size={size} {...props} />
    )
}