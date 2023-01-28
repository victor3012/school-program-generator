import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function PlusIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='plus' color={color} size={size} {...props} />
    )
}