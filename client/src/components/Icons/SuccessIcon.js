import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function SuccessIcon({
    color = styleVar.green,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='check-decagram' color={color} size={size} {...props} />
    )
}