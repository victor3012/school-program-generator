import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronDoubleLeftIcon({
    color = styleVar.darkBlue,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-double-left' color={color} size={size} {...props} />
    )
}