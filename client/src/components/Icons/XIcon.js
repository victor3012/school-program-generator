import Icon from 'react-native-vector-icons/Octicons'
import styleVar from '../../styles/styleVar'

export default function XIcon({
    color = styleVar.red,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='x' color={color} size={size} {...props} />
    )
}