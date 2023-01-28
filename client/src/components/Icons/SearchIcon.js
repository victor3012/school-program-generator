import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function SearchIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='magnify' color={color} size={size} {...props} />
    )
}