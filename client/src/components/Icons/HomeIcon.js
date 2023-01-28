import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function HomeIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='home' color={color} size={size} {...props} />
    )
}

// shape-plus