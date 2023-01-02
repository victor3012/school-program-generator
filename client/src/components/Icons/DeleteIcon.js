import Icon from 'react-native-vector-icons/Feather'
import styleVar from '../../styles/styleVar'

export default function DeleteIcon({
    color = styleVar.red,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='trash-2' color={color} size={size} {...props} />
    )
}