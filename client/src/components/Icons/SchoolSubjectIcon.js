import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function SchoolSubjectIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='book-open-variant' color={color} size={size} {...props} />
    )
}