import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function EyeIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='eye-off-outline' color={color} size={size} {...props} />
    )
}