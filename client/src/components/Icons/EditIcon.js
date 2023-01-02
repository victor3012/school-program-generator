import Icon from 'react-native-vector-icons/FontAwesome5'
import styleVar from '../../styles/styleVar'

export default function EditIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='pencil-alt' color={color} size={size} {...props} />
    )
}