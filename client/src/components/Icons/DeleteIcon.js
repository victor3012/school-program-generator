import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function DeleteIcon({
    color = styleVar.red,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='trash-can-outline' color={color} size={size} {...props} />
    )
}