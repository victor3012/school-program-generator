import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronUpIcon({
    color = styleVar.gray,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-up' color={color} size={size} {...props} />
    )
}