import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function LoginIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='login' color={color} size={size} {...props} />
    )
}