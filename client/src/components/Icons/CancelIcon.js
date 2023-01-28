import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function CancelIcon({
    color = styleVar.red,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='close-circle' color={color} size={size} {...props} />
    )
}