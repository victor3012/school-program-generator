import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function BackIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='arrow-left' color={color} size={size} {...props} />
    )
}