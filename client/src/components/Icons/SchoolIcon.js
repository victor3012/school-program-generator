import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function SchoolIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='school' color={color} size={size} {...props} />
    )
}