import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronDoubleRightIcon({
    color = styleVar.darkBlue,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-double-right' color={color} size={size} {...props} />
    )
}