import Icon from '../Icon'
import styleVar from '../../../styles/styleVar'

export default function ChevronLeftIcon({
    color = styleVar.darkBlue,
    size = styleVar.largeIconSize,
    ...props
}) {
    return (
        <Icon name='chevron-left' color={color} size={size} {...props} />
    )
}