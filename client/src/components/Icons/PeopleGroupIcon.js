import Icon from './Icon'
import styleVar from '../../styles/styleVar'

export default function PeopleGroupIcon({
    color = styleVar.blue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='account-group' color={color} size={size} {...props} />
    )
}