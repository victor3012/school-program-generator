import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronDownIcon({
    color = styleVar.gray,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-down' color={color} size={size} {...props} />
    )
}