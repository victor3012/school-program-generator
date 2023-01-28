import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function TeacherIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='human-male-board' color={color} size={size} {...props} />
    )
}