import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function ClassroomIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='google-classroom' color={color} size={size} {...props} />
    )
}