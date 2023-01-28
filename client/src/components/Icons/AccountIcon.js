import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function AccountIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='account-cowboy-hat' color={color} size={size} {...props} />
    )
}