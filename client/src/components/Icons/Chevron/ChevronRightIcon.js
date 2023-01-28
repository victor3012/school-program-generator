import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronRightIcon({
    color = styleVar.darkBlue,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-right' color={color} size={size} {...props} />
    )
}