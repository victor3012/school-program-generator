import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function OptionsIcon({
    color = styleVar.gray,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='dots-horizontal' color={color} size={size} {...props} />
    )
}