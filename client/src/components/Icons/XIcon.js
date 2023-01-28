import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function XIcon({
    color = styleVar.red,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='close' color={color} size={size} {...props} />
    )
}