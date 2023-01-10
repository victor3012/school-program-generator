import Icon from 'react-native-vector-icons/FontAwesome5'
import styleVar from '../../styles/styleVar'

export default function SchoolIcon({
    color = styleVar.darkBlue,
    size = styleVar.mediumIconSize,
    ...props
}) {
    return (
        <Icon name='school' color={color} size={size} {...props} />
    )
}