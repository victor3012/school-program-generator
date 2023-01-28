import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function SignUpIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='account-plus' color={color} size={size} {...props} />
    )
}